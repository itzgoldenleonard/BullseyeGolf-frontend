<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTournament, formChanged } from '../../persistence/stores';

	let inactiveHoles: Hole[] = [];

	onMount(() => {
		for (let i = 0; i < 18; i++) {
			inactiveHoles = [
				...inactiveHoles,
				{
					hole_number: i + 1,
					hole_text: '',
					hole_image: '',
					game_mode: '',
					hole_sponsor: '',
					scores: []
				}
			];
		}

		for (let hole of $activeTournament.holes) {
			inactiveHoles[hole.hole_number - 1] = null;
		}
	});

	function checkHandler(event: any): void {
		let id: number = Number(event.target.id);
		let checked: boolean = !!inactiveHoles[id];
		formChanged.set(true);
		if (checked) check(id);
		else uncheck(id);
	}

	function check(id: number): void {
		if (!inactiveHoles[id]) return; // Double check that it hasnt already been moved
		$activeTournament.holes = [...$activeTournament.holes, inactiveHoles[id]];
		inactiveHoles[id] = null;
	}

	function uncheck(id: number): void {
		if (inactiveHoles[id]) return; // Double check that it hasnt already been moved
		for (let i in $activeTournament.holes) {
			if ($activeTournament.holes[i].hole_number - 1 === id) {
				inactiveHoles[id] = $activeTournament.holes.splice(Number(i), 1)[0];
				$activeTournament.tournament_name += ''; // Assign to it to update the UI
			}
		}
	}
</script>

<aside>
	<h2>Vælg huller:</h2>

	<div>
		{#each inactiveHoles as inactiveHole, i}
			<button aria-selected={!inactiveHole} on:click={checkHandler} id={String(i)}>{i + 1}</button>
		{/each}
	</div>
</aside>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	aside {
		grid-area: holeselector;
		padding: $padding;

		div {
			display: grid;
			place-items: center;
			grid-template-columns: repeat(3, 1fr);

			button {
				@extend %selectable;
				@extend %selected;
				padding: $padding;
				border-radius: $border-radius-small;
				width: 42px;
				margin: $padding-small/2;
			}
		}
	}
</style>
