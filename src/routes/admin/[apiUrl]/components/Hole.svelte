<script lang="ts">
	import { formChanged } from '../persistence/stores';
	import ImagePicker from './ImagePicker.svelte';

	export let hole: Hole;

	function removeScore(index: number): void {
		hole.scores = hole.scores.filter((e, i) => i !== index); // TODO: take a look at this boy again once I've slept on it
		formChanged.set(true);
	}
</script>

<details>
	<summary><b>Hul {hole.hole_number}</b></summary>
	<ImagePicker bind:value={hole.hole_image} alt={`Hul ${hole.hole_number} billede`} />
	<div>
		<label for="hole_sponsor" style="display: grid; grid-template-columns: auto 1fr; gap: 1rem;"
			>Hul sponsor:
			<input type="text" name="hole_sponsor" bind:value={hole.hole_sponsor} maxlength="40" />
		</label>

		<label for="hole_text" style="display: grid; grid-template-columns: auto 1fr; gap: 1rem;"
			>Hul tekst:
			<input type="text" name="hole_text" bind:value={hole.hole_text} maxlength="40" placeholder="Nærmest hullet"/>
		</label>

		{#each hole.scores as score, i}
			<div
				style="display: grid; grid-template-columns: 1fr 1fr auto; column-gap: 0.5rem; width: 100%; row-gap: 0.1rem;"
			>
				<p>{score.player_name}</p>
				<p>{score.player_score}</p>
				<button style="color: red;" on:click|preventDefault={() => removeScore(i)}>x</button>
			</div>
		{/each}
	</div>
</details>
