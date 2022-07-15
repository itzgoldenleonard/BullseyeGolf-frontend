<script lang="ts">
	import Drawer, { AppContent, Content, Header, Title } from '@smui/drawer';
	import List, { Item, Text, Separator, Subheader } from '@smui/list';
	import { H6 } from '@smui/common/elements';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	let topAppBar: TopAppBarComponentDev;
	import TopAppBar, { Row, Section, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	let drawerOpen = true;
	let activeTournament = '0';
	let activeTab = 'Turnering';
</script>

<Drawer variant="dismissible" bind:open={drawerOpen}>
	<Header>
		<Title>Turneringer</Title>
	</Header>

	<Content>
		<Subheader component={H6}>Aktive</Subheader>
		<List>
			<Item
				on:click={() => (activeTournament = 'Gray Kittens')}
				activated={activeTournament === 'Gray Kittens'}
			>
				<Text>Gray Kittens</Text>
			</Item>
			<Item
				on:click={() => (activeTournament = '174780')}
				activated={activeTournament === '174780'}
			>
				<Text>Gennemgående nærmest hullet i 2</Text>
			</Item>

			<Separator />
			<Subheader component={H6}>Fremtidige</Subheader>

			<Item
				on:click={() => (activeTournament = '180024')}
				activated={activeTournament === '180024'}
			>
				<Text>Extra 2</Text>
			</Item>

			<Separator />
			<Subheader component={H6}>Afsluttede</Subheader>
		</List>
	</Content>
</Drawer>

<AppContent>
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
		This will be the new admin panel
		<br />
		Selected tab: {activeTab}
	</AutoAdjust>
</AppContent>
