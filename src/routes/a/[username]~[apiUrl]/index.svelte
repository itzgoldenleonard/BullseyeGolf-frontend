<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	let topAppBar: TopAppBarComponentDev;
	import TopAppBar, { Row, Section, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	import Tutorial from './_panels/Tutorial.svelte';
	import Turnering from './_panels/Turnering.svelte';
	import Huller from './_panels/Huller.svelte';
	import Drawer from './_components/Drawer.svelte';

	let drawerOpen = true;
	let activeTournament = '0';
	let activeTab = '';

	let tournamentList = [
		{
			active: true,
			t_end: 1654430400,
			t_start: 1654248000,
			tournament_id: '26550',
			tournament_name: '\u00c5ben herredag 2022'
		},
		{
			active: false,
			t_end: 1656189000,
			t_start: 1654659000,
			tournament_id: '301965',
			tournament_name: 'Herreklubben juni'
		},
		{
			active: false,
			t_end: 1656308460,
			t_start: 1656222060,
			tournament_id: '774182',
			tournament_name: '\u00c6gteparturneringen'
		},
		{
			active: false,
			t_end: 1657300320,
			t_start: 1657041120,
			tournament_id: '275151',
			tournament_name: '\u00c5ben herredag juli 2022'
		}
	];
</script>

<Drawer bind:open={drawerOpen} {tournamentList}>
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
		{#if activeTab === 'Turnering'}
			<Turnering />
		{:else if activeTab === 'Huller'}
			<Huller />
		{:else}
			<Tutorial />
		{/if}
	</AutoAdjust>
</Drawer>
