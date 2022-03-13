<script lang="ts">
	import { selectedTournament } from '../../persistence/stores';
	import { createEventDispatcher, onDestroy } from 'svelte';
	export let tournament: ShortTournament;
	export let selected: boolean = false;

	const dispatch = createEventDispatcher();
	function onClick(): void {
		dispatch('pick', tournament.db_id);
	}
	const unsubscribe = selectedTournament.subscribe(value => {
		selected = tournament.db_id === value;
	});

	onDestroy(unsubscribe);
</script>

<main on:click={onClick} id={tournament.db_id} aria-selected={selected}>
	{tournament.tournament_name}
</main>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	main {
		@extend %tournament-list;
		margin-left: 20px;
		font-weight: 400;
		font-size: $h3-size;
	}
</style>