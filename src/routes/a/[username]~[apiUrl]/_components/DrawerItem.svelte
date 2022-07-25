<script lang="ts">
	// SMUI Components
	import List, { Item, Text, Separator, Meta, Graphic } from '@smui/list';
	import Dialog, { Title, Content } from '@smui/dialog';
	// Functions
	import { createEventDispatcher } from 'svelte';

	// UI Variables
	let open = false;
	export let active: string;

	// Variables
	export let tournament: ShortTournament;

	// Functions
	const dispatch = createEventDispatcher();
	function duplicate(tournamentId: string) {
		dispatch('duplicate', { tournamentId });
		open = false;
	}
	function pick(tournamentId: string) {
		dispatch('pick', { tournamentId });
	}
	function remove(tournamentId: string) {
		dispatch('delete', { tournamentId });
		open = false;
	}
	function print(tournamentId: string) {
		dispatch('print', { tournamentId });
		open = false;
	}
</script>

<Item
	on:click={() => pick(tournament.tournament_id)}
	activated={active === tournament.tournament_id}
>
	<Text>{tournament.tournament_name}</Text>
	<Meta class="material-icons" on:click$stopPropagation={() => (open = true)}>more_vert</Meta>
</Item>

<Dialog bind:open selection>
	<Title>{tournament.tournament_name}</Title>
	<Content>
		<List style="padding-block: 8px;">
			<Item on:SMUI:action={() => print(tournament.tournament_id)}>
				<Graphic class="material-icons">print</Graphic>
				<Text>Print</Text>
			</Item>
			<Item on:SMUI:action={() => duplicate(tournament.tournament_id)}>
				<Graphic class="material-icons">content_copy</Graphic>
				<Text>Dupliker</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => remove(tournament.tournament_id)}>
				<Graphic class="material-icons error-text">delete</Graphic>
				<Text class="error-text">Slet</Text>
			</Item>
		</List>
	</Content>
</Dialog>
