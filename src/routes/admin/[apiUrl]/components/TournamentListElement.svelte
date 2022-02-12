<script lang="ts">
	//import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	export let tournament: ShortTournament;

	const dispatch = createEventDispatcher();
	function onClick(): void { dispatch('pick', tournament.db_id); }
</script>

<div class="tournament-list-element" on:click={onClick} id={tournament.db_id}>
	<h1>{tournament.tournament_name}</h1>
</div>
