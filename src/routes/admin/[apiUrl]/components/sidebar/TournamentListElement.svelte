<script lang="ts">
	// # Imports
	import { selectedTournament } from '../../persistence/stores';
	import { createEventDispatcher, onDestroy } from 'svelte';

	// # Exports
	export let tournament: ShortTournament;
	export let selected: boolean = false;

	// # Functions
	const dispatch = createEventDispatcher();
	function onClick(): void {
		dispatch('pick', tournament.db_id);
	}

	// On load
	const unsubscribe = selectedTournament.subscribe((value) => {
		selected = tournament.db_id === value;
	});

	onDestroy(unsubscribe);
</script>

<button on:click={onClick} id={tournament.db_id} aria-selected={selected}>
	{tournament.tournament_name}
</button>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	button {
		@extend %tournament-list;
		margin-left: 20px;
		font-weight: 400;
		font-size: $h3-size;
		border: 0;
		background: none;
		color: $text-color;
		text-align: left;
	}
</style>
