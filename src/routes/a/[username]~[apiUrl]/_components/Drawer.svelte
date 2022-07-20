<script lang="ts">
	import Drawer, { AppContent, Content, Header, Title } from '@smui/drawer';
	import List, { Item, Text, Separator, Subheader } from '@smui/list';
	import { H6 } from '@smui/common/elements';

	export let open: boolean;
    export let tournamentList: Promise<ShortTournament[]>;
	let active = '';
</script>

<Drawer variant="dismissible" bind:open>
	<Header>
		<Title>Turneringer</Title>
	</Header>

	<Content>
		<List>
			<Subheader component={H6}>Aktive</Subheader>
			{#each tournamentList.filter((e) => e.active) as tournament}
				<Item
					on:click={() => (active = tournament.tournament_id)}
					activated={active === tournament.tournament_id}
				>
					<Text>{tournament.tournament_name}</Text>
				</Item>
			{/each}

			<Separator />
			<Subheader component={H6}>Fremtidige</Subheader>

			{#each tournamentList.filter((e) => !e.active && Date.now() < e.t_start * 1000) as tournament}
				<Item
					on:click={() => (active = tournament.tournament_id)}
					activated={active === tournament.tournament_id}
				>
					<Text>{tournament.tournament_name}</Text>
				</Item>
			{/each}

			<Separator />
			<Subheader component={H6}>Afsluttede</Subheader>

			{#each tournamentList.filter((e) => !e.active && e.t_end * 1000 < Date.now()) as tournament}
				<Item
					on:click={() => (active = tournament.tournament_id)}
					activated={active === tournament.tournament_id}
				>
					<Text>{tournament.tournament_name}</Text>
				</Item>
			{/each}
		</List>
	</Content>
</Drawer>

<AppContent style="height: 100%;">
	<slot />
</AppContent>
