<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	import { saved } from './scripts/stores';
	// SMUI Components
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import Menu from '@smui/menu';
	import type { MenuComponentDev } from '@smui/menu';
	import List, { Item, Separator, Text, Graphic } from '@smui/list';
	import Fab, { Icon, Label as FabLabel } from '@smui/fab';
	// Custom Components
	// Tabs
	import Tutorial from './_tabs/Tutorial.svelte';
	import Turnering from './_tabs/Turnering.svelte';
	import Huller from './_tabs/Huller.svelte';
	// Other
	import Drawer from './_components/Drawer.svelte';
	import Print from './_components/Print.svelte';
	// Functions
	import {
		getTournamentList,
		getTournament,
		postTournament,
		deleteTournament as deleteApi
	} from './scripts/api';
	import { generateID } from './scripts/misc';
	import { onMount } from 'svelte';

	// UI Variables
	let menu: MenuComponentDev;
	let drawerOpen = true;
	let activeTab = '';
	let activeTournamentId = '';
	let mobile = false;

	// Variables
	let baseUrl = `https://${$page.params.apiUrl}/${$page.params.username}`;
	let tournament: Tournament = null;
	let tournamentList = getTournamentList(baseUrl);

	// Functions
	async function createTournament() {
		if (confirmLeave()) return;
		activeTab = '';
		let now = Math.floor(Date.now() / 1000);
		tournament = {
			tournament_id: generateID(),
			tournament_name: '',
			tournament_image: '',
			tournament_sponsor: '',
			holes: [],
			t_start: now,
			t_end: now + 86400
		};
		activeTournamentId = tournament.tournament_id;
		await new Promise((r) => setTimeout(r, 0.1));
		activeTab = 'Turnering';
		$saved = false;
	}
	// Duplication
	function duplicateActiveTournament() {
		if (confirmLeave()) return;
		tournament.tournament_id = generateID();
		activeTournamentId = tournament.tournament_id;
		tournament.tournament_name += ' (kopi)';
		$saved = false;
	}

	async function duplicateTournamentByEvent(e: CustomEvent<{ tournamentId: string }>) {
		await pick(e);
		duplicateActiveTournament();
	}

	async function pick(e: CustomEvent<{ tournamentId: string }>) {
		if (confirmLeave()) return;
		activeTab = '';

		try {
			tournament = await getTournament(baseUrl, e.detail.tournamentId);
		} catch (e) {
			alert(e);
			return;
		}

		activeTournamentId = e.detail.tournamentId;
		activeTab = 'Turnering';
		$saved = true;
	}

	async function save() {
		if (tournament.t_end < tournament.t_start)
			return alert('Slut tidspunktet må ikke være før start tidspunktet');

		try {
			await postTournament(baseUrl, tournament, String($page.url.searchParams.get('apiKey')));
		} catch (e) {
			alert(e);
			return;
		}

		tournamentList = getTournamentList(baseUrl);
		$saved = true;
	}
	// Deletion
	async function deleteWrapper(tournamentId: string): Promise<boolean> {
		if (!confirm('Er du sikker på at du vil slette turneringen? Du kan ikke fortryde!'))
			return false;

		try {
			await deleteApi(baseUrl, tournamentId, String($page.url.searchParams.get('apiKey')));
		} catch (e) {
			alert(e);
			return false;
		}

		tournamentList = getTournamentList(baseUrl);
		return true;
	}

	async function deleteActiveTournament() {
		if (!(await deleteWrapper(tournament.tournament_id))) return;
		tournament = null;
		$saved = true;
	}

	function deleteTournamentByEvent(e: CustomEvent<{ tournamentId: string }>) {
		if (tournament !== null && tournament.tournament_id === e.detail.tournamentId) {
			deleteActiveTournament();
		} else {
			deleteWrapper(e.detail.tournamentId);
		}
	}

	async function printByEvent(e: CustomEvent<{ tournamentId: string }>) {
		await pick(e);
		window.print();
	}

	function confirmLeave(): boolean {
		// Returns true if you cancel the confirmation
		return (
			!$saved &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		);
	}

	// Lifecycle
	onMount(() => {
		mobile = window.matchMedia('(max-width: 480px)').matches;
		if (mobile) drawerOpen = false;
	});

	function beforeunload(event: any) {
		if (!$saved) {
			event.preventDefault();
		}
		event.returnValue = '';
		return '...';
	}
</script>

<svelte:window on:beforeunload={beforeunload} />
<div id="dont-print">
	<Drawer
		bind:open={drawerOpen}
		modal={mobile}
		{tournamentList}
		on:pick={pick}
		active={activeTournamentId}
		on:createTournament={createTournament}
		on:print={printByEvent}
		on:duplicate={duplicateTournamentByEvent}
		on:delete={deleteTournamentByEvent}
	>
		<TopAppBar variant="static" dense>
			<Row>
				<Section>
					<IconButton class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}
						>menu</IconButton
					>
					<TabBar tabs={['Turnering', 'Huller']} let:tab bind:active={activeTab}>
						<Tab disabled={!tournament} {tab} minWidth>
							<Label>{tab}</Label>
						</Tab>
					</TabBar>
				</Section>
				<Section align="end" toolbar>
					<IconButton
						disabled={!tournament}
						class="material-icons"
						aria-label="More"
						on:click={() => menu.setOpen(true)}
						>more_vert
						<Menu bind:this={menu}>
							<List>
								<Item on:SMUI:action={() => window.print()}>
									<Graphic class="material-icons">print</Graphic>
									<Text>Print</Text>
								</Item>
								<Item on:SMUI:action={duplicateActiveTournament}>
									<Graphic class="material-icons">content_copy</Graphic>
									<Text>Dupliker</Text>
								</Item>
								<Separator />
								<Item on:SMUI:action={deleteActiveTournament}>
									<Graphic class="material-icons error-text">delete</Graphic>
									<Text class="error-text">Slet</Text>
								</Item>
							</List>
						</Menu>
					</IconButton>
				</Section>
			</Row>
		</TopAppBar>

		<form on:submit|preventDefault={save} on:change={() => ($saved = false)}>
			{#if activeTab === 'Turnering' && tournament !== null}
				<Turnering bind:tournament />
			{:else if activeTab === 'Huller' && tournament !== null}
				<Huller bind:holes={tournament.holes} />
			{:else}
				<Tutorial />
			{/if}

			<div class="fab-pos full-width-if-mobile" class:non-interactive={$saved}>
				<Fab extended exited={$saved} class="full-width-if-mobile">
					<Icon class="material-icons">save</Icon>
					<FabLabel>Gem</FabLabel>
				</Fab>
			</div>
		</form>
	</Drawer>
</div>

<Print {tournament} />

<style lang="scss">
	#dont-print {
		height: 100%;
		width: 100%;
		overflow: clip;

		@media only print {
			display: none;
		}
	}

	form {
		height: calc(100% - 48px);
		box-sizing: border-box;
		overflow-y: scroll;
		padding: 10px;

		.fab-pos {
			position: absolute;
			bottom: 0;
			right: 0;
			padding: 10px;
			box-sizing: border-box;
		}

		.non-interactive {
			pointer-events: none;
		}
	}
</style>
