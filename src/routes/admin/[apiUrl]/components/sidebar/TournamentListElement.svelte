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

<div on:click={onClick} id={tournament.db_id} aria-selected={selected}>
	{tournament.tournament_name}
</div>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	div {
		@extend %summary;
		@extend %selected;
		margin-left: 20px;
		font-weight: 400;
		text-align: left;
		font-size: $h3-size;
	}
</style>
