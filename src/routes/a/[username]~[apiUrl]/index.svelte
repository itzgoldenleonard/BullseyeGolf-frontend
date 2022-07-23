<script lang="ts">
	import { page } from '$app/stores';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Fab, { Icon, Label as FabLabel } from '@smui/fab';

	import type { MenuComponentDev } from '@smui/menu';
	import Menu from '@smui/menu';
	let menu: MenuComponentDev;
    import List, { Item, Separator, Text } from '@smui/list';

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
	$: fabExited = !activeTournament;

	let tournamentList = getTournamentList(baseUrl);

	import { getTournamentList, getTournament, postTournament, deleteTournament } from './scripts/api';
    import { generateID } from './scripts/misc';

	async function pick(e: CustomEvent<{ tournamentId: string }>) {
		activeTab = '';
		activeTournament = await getTournament(baseUrl, e.detail.tournamentId);
		activeTab = 'Turnering';
		await new Promise((r) => setTimeout(r, 1));
		fabExited = true;
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
		fabExited = true;
	}

    async function deleteCurrentTournament() {
        if (!confirm('Er du sikker på at du vil slette turneringen? Du kan ikke fortryde!')) return;

		try {
            await deleteTournament(baseUrl, activeTournament.tournament_id, String($page.url.searchParams.get('apiKey')))
		} catch (e) {
			alert(e);
			return;
		}

		tournamentList = getTournamentList(baseUrl);
        activeTournament = null;
		fabExited = true;
    }

    function createTournament() {
        activeTournament 
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
		activeTab = 'Turnering';
    }
</script>

<Drawer bind:open={drawerOpen} {tournamentList} on:pick={pick} on:createTournament={createTournament} >
	<TopAppBar bind:this={topAppBar} variant="fixed" dense>
		<Row>
			<Section>
				<IconButton class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}
					>menu</IconButton
				>
				<TabBar tabs={['Turnering', 'Huller']} let:tab bind:active={activeTab}>
					<Tab {tab} minWidth>
						<Label>{tab}</Label>
					</Tab>
				</TabBar>
			</Section>
			<Section align="end" toolbar>
                <IconButton class="material-icons" aria-label="More" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
				<Menu bind:this={menu}>
					<List>
						<Item on:SMUI:action={() => (alert('Cut'))}>
							<Text>Cut</Text>
						</Item>
						<Item on:SMUI:action={() => (alert('Copy'))}>
							<Text>Copy</Text>
						</Item>
						<Item on:SMUI:action={() => (alert('Paste'))}>
							<Text>Paste</Text>
						</Item>
						<Separator />
						<Item on:SMUI:action={deleteCurrentTournament}>
                            <Text class="error-text" style="color: red; //tmp">Slet turnering</Text>
						</Item>
					</List>
				</Menu>
			</Section>
		</Row>
	</TopAppBar>

	<AutoAdjust {topAppBar} style="height: 100%; box-sizing: border-box;">
		{#if activeTab === 'Turnering' && activeTournament !== null}
			<Turnering bind:tournament={activeTournament} />
		{:else if activeTab === 'Huller' && activeTournament !== null}
			<Huller bind:holes={activeTournament.holes} />
		{:else}
			<Tutorial />
		{/if}

		<div class="fab-pos">
			<Fab on:click={submit} extended exited={fabExited} class="full-width-if-mobile">
				<Icon class="material-icons">save</Icon>
				<FabLabel>Gem</FabLabel>
			</Fab>
		</div>
	</AutoAdjust>
</Drawer>

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
</style>
