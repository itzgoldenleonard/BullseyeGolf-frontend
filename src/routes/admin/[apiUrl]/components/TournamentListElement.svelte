<script lang="ts">
	//import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	export let tournament: ShortTournament;

	const dispatch = createEventDispatcher();
	function onClick(): void {
		dispatch('pick', tournament.db_id);
	}

</script>

<main on:click={onClick} id={tournament.db_id}>
	{tournament.tournament_name}
</main>

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	main {
		@extend %tournament-list;
		margin-left: 20px;
	}
</style>