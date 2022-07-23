<script lang="ts">
	import Drawer, { AppContent, Content, Header, Title } from '@smui/drawer';
	import List, { Item, Text, Separator, Subheader } from '@smui/list';
	import { H6 } from '@smui/common/elements';
	import { createEventDispatcher } from 'svelte';
    import Button, { Label } from '@smui/button';

	export let open: boolean;
	export let tournamentList: Promise<ShortTournament[]>;

	export let active = '';

	const dispatch = createEventDispatcher();
	function pick(tournamentId: string) {
		dispatch('pick', { tournamentId });
		active = tournamentId;
	}

    function createTournament() {
        dispatch('createTournament');
        active = '';
    }
</script>

<Drawer variant="dismissible" bind:open>
	<Header>
		<Title>Turneringer</Title>
	</Header>

	<Content>
		<List>
			<Subheader component={H6}>Aktive</Subheader>
			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => e.active) as tournament}
					<Item
						on:click={() => pick(tournament.tournament_id)}
						activated={active === tournament.tournament_id}
					>
						<Text>{tournament.tournament_name}</Text>
					</Item>
				{/each}
			{/await}

			<Separator />
			<Subheader component={H6}>Fremtidige</Subheader>

			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => !e.active && Date.now() < e.t_start * 1000) as tournament}
					<Item
						on:click={() => pick(tournament.tournament_id)}
						activated={active === tournament.tournament_id}
					>
						<Text>{tournament.tournament_name}</Text>
					</Item>
				{/each}
			{/await}

			<Separator />
			<Subheader component={H6}>Afsluttede</Subheader>

			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => !e.active && e.t_end * 1000 < Date.now()) as tournament}
					<Item
						on:click={() => pick(tournament.tournament_id)}
						activated={active === tournament.tournament_id}
					>
						<Text>{tournament.tournament_name}</Text>
					</Item>
				{/each}
			{/await}
		</List>
	</Content>

    <Button on:click={createTournament} touch variant="raised">
        <Label>Ny Turnering</Label>
    </Button>
</Drawer>

<AppContent style="height: 100%;">
	<slot />
</AppContent>
