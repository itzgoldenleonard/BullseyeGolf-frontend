<script lang="ts">
	//import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	export let content: ShortTournament;

	const dispatch = createEventDispatcher();
	function handleClick() {
		dispatch('pick', {
			db_id: content.db_id
		});
	}
</script>

<div class="tournament-list-element" on:click={handleClick} id={content.db_id}>
	<h1>{content.tournament_name}</h1>
</div>
