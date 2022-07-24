<script lang="ts">
	import { page } from '$app/stores';
	import { fabExited } from './scripts/stores.ts';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Fab, { Icon, Label as FabLabel } from '@smui/fab';

	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	let menu: MenuComponentDev;
	import List, { Item, Separator, Text, Graphic } from '@smui/list';

	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	let topAppBar: TopAppBarComponentDev;
	import TopAppBar, { Row, Section, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	import Tutorial from './_panels/Tutorial.svelte';
	import Turnering from './_panels/Turnering.svelte';
	import Huller from './_panels/Huller.svelte';
	import Drawer from './_components/Drawer.svelte';

	let baseUrl = `https://${$page.params.apiUrl}/${$page.params.username}`;
	let drawerOpen = true;
	let activeTournament: Tournament = null;
	let activeTab = '';
	let selectedTournament = '';
	let mobile = false;

	let tournamentList = getTournamentList(baseUrl);

	import {
		getTournamentList,
		getTournament,
		postTournament,
		deleteTournament
	} from './scripts/api';
	import { generateID } from './scripts/misc';
	import Print from './_components/Print.svelte';
	import { onMount } from 'svelte';

	async function pick(e: CustomEvent<{ tournamentId: string }>) {
		if (
			!$fabExited &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		)
			return;
		activeTab = '';
		activeTournament = await getTournament(baseUrl, e.detail.tournamentId);
		selectedTournament = e.detail.tournamentId;
		activeTab = 'Turnering';
	}

	async function submit() {
		if (activeTournament.t_end < activeTournament.t_start)
			return alert('Slut tidspunktet må ikke være før start tidspunktet');

		try {
			await postTournament(baseUrl, activeTournament, String($page.url.searchParams.get('apiKey')));
		} catch (e) {
			alert(e);
			return;
		}

		tournamentList = getTournamentList(baseUrl);
		$fabExited = true;
	}

	async function deleteTournamentById(tournamentId: string): Promise<number> {
		if (!confirm('Er du sikker på at du vil slette turneringen? Du kan ikke fortryde!')) return -1;

		try {
			await deleteTournament(baseUrl, tournamentId, String($page.url.searchParams.get('apiKey')));
		} catch (e) {
			alert(e);
			return -1;
		}

		tournamentList = getTournamentList(baseUrl);
		return 0;
	}

	async function deleteCurrentTournament() {
		if ((await deleteTournamentById(activeTournament.tournament_id)) !== 0) return;
		activeTournament = null;
		$fabExited = true;
	}

	function duplicateCurrentTournament() {
		if (
			!$fabExited &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		)
			return;

		activeTournament.tournament_id = generateID();
		selectedTournament = activeTournament.tournament_id;
		activeTournament.tournament_name += ' (kopi)';
	}

	function createTournament() {
		if (
			!$fabExited &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		)
			return;
		activeTab = '';
		let now = Math.floor(Date.now() / 1000);
		activeTournament = {
			tournament_id: generateID(),
			tournament_name: '',
			tournament_image: '',
			tournament_sponsor: '',
			holes: [],
			t_start: now,
			t_end: now + 86400
		};
		selectedTournament = activeTournament.tournament_id;
		activeTab = 'Turnering';
	}

	async function print(e: CustomEvent<{ tournamentId: string }>) {
		await pick(e);
		window.print();
	}

	async function duplicateTournament(e: CustomEvent<{ tournamentId: string }>) {
		await pick(e);
		duplicateCurrentTournament();
	}

	function deleteTournamentWithEvent(e: CustomEvent<{ tournamentId: string }>) {
		if (activeTournament.tournament_id === e.detail.tournamentId) {
			deleteCurrentTournament();
		} else {
			deleteTournamentById(e.detail.tournamentId);
		}
	}

	onMount(() => {
		mobile = window.matchMedia('(max-width: 480px)').matches;
		if (mobile) drawerOpen = false;
	});

	function beforeunload(event) {
		if (!$fabExited) {
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
		active={selectedTournament}
		on:createTournament={createTournament}
		on:print={print}
		on:duplicate={duplicateTournament}
		on:delete={deleteTournamentWithEvent}
	>
		<TopAppBar bind:this={topAppBar} variant="static" dense>
			<Row>
				<Section>
					<IconButton class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}
						>menu</IconButton
					>
					<TabBar tabs={['Turnering', 'Huller']} let:tab bind:active={activeTab}>
						<Tab disabled={!activeTournament} {tab} minWidth>
							<Label>{tab}</Label>
						</Tab>
					</TabBar>
				</Section>
				<Section align="end" toolbar>
					<IconButton
						disabled={!activeTournament}
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
								<Item on:SMUI:action={duplicateCurrentTournament}>
									<Graphic class="material-icons">content_copy</Graphic>
									<Text>Dupliker</Text>
								</Item>
								<Separator />
								<Item on:SMUI:action={deleteCurrentTournament}>
									<Graphic class="material-icons" style="color: red;">delete</Graphic>
									<Text class="error-text" style="color: red; //tmp">Slet</Text>
								</Item>
							</List>
						</Menu>
					</IconButton>
				</Section>
			</Row>
		</TopAppBar>

		<AutoAdjust {topAppBar} style="height: 100%; box-sizing: border-box;">
			<form on:submit|preventDefault={submit} on:change={() => ($fabExited = false)}>
				{#if activeTab === 'Turnering' && activeTournament !== null}
					<Turnering bind:tournament={activeTournament} />
				{:else if activeTab === 'Huller' && activeTournament !== null}
					<Huller bind:holes={activeTournament.holes} />
				{:else}
					<Tutorial />
				{/if}

				<div class="fab-pos" class:non-interactive={$fabExited}>
					<Fab extended exited={$fabExited} class="full-width-if-mobile">
						<Icon class="material-icons">save</Icon>
						<FabLabel>Gem</FabLabel>
					</Fab>
				</div>
			</form>
		</AutoAdjust>
	</Drawer>
</div>

<Print tournament={activeTournament} />

<style lang="scss">
	.fab-pos {
		position: absolute;
		bottom: 0;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
	}

	.non-interactive {
		pointer-events: none;
	}

	#dont-print {
		height: 100%;
		width: 100%;
		overflow: clip;

		@media only print {
			display: none;
		}
	}

	form {
		height: 100%;
		overflow-y: scroll;
	}
</style>
