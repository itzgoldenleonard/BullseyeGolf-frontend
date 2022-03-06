<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTournament, formChanged } from '../persistence/stores';

	let inactiveHoles: Hole[] = [];

	onMount(() => {
		for (let i = 0; i < 18; i++) {
            inactiveHoles = [...inactiveHoles, {
				hole_number: i + 1,
				hole_text: '',
				hole_image: '',
				game_mode: '',
				hole_sponsor: '',
				scores: []
            }]
		}

		for (let hole of $activeTournament.holes) {
			inactiveHoles[hole.hole_number - 1] = null;
		}
	});

	function checkHandler(event: any): void {
		let id: number = Number(event.target.id);
		let checked: boolean = event.target.checked;
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

<main>
	<p>Vælg huller:</p>

	{#each inactiveHoles as inactiveHole, i}
		<label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
			Hul {i + 1}:
			<input type="checkbox" checked={!inactiveHole} on:change={checkHandler} id={String(i)} />
		</label>
	{/each}
</main>
	
<style lang="scss">
	@import '../../../../../static/_variables';

	main {
		grid-area: holeselector;
		background-color: $foreground-color;
		border-radius: $border-radius-medium;
		padding: 0 $padding;
		box-shadow: $shadow-medium;
	}
</style>