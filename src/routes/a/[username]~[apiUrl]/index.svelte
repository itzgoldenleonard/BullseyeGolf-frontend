<script lang="ts">
	import { page } from '$app/stores';

	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Fab, { Icon, Label as FabLabel } from '@smui/fab';

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

	import { getTournamentList, getTournament } from './scripts/api';

	async function pick(e: CustomEvent<{ tournamentId: string }>) {
		activeTab = '';
		activeTournament = await getTournament(baseUrl, e.detail.tournamentId);
		activeTab = 'Turnering';
		await new Promise((r) => setTimeout(r, 1));
		fabExited = true;
	}
</script>

<Drawer bind:open={drawerOpen} {tournamentList} on:pick={pick}>
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
			<Fab
				on:click={() => (fabExited = true)}
				extended
				exited={fabExited}
				class="full-width-if-mobile"
			>
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
