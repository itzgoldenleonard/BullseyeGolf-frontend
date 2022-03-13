<script lang="ts">
	import { formChanged } from '../../persistence/stores';
	import ImagePicker from '../../../../../../static/components/ImagePicker.svelte';
	import InputText from '../../../../../../static/components/InputText.svelte';

	export let hole: Hole;

	function removeScore(index: number): void {
		hole.scores = hole.scores.filter((e, i) => i !== index); // TODO: take a look at this boy again once I've slept on it
		formChanged.set(true);
	}
</script>

<details>
	<summary>Hul {hole.hole_number}</summary>
	<main>
		<InputText label="Hul sponsor" bind:value={hole.hole_sponsor} maxlength={40}/>

		<InputText label="Hul tekst" bind:value={hole.hole_text} maxlength={40}/> <!--Maybe there should be a placeholder in here-->

		<figure>
			<ImagePicker bind:value={hole.hole_image} alt={`Hul ${hole.hole_number} billede`} />
		</figure>

		<ul>
			{#each hole.scores as score, i}
				<article>
					<p>{score.player_name}</p>
					<p>{score.player_score}</p>
					<button style="color: red;" on:click|preventDefault={() => removeScore(i)}>x</button>
				</article>
			{/each}

			{#if hole.scores.length === 0}
				<p>Der er ingen scorer endnu</p>
			{/if}
		</ul>
	</main>
</details>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	$image-height: 5*$h3-size + 18*$padding;

	details {
		margin: $padding 0;
	}

	main {
		font-size: $h3-size;
		color: $text-color;
		
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr;
		gap: $padding;
	}

	ul {
		overflow-y: auto;
		margin: 0;
		padding: 0;
		height: $image-height;
	}

	figure {
		position: relative;
		margin: 0;
		height: $image-height;
	}

	summary {
		@extend %tournament-list;
		margin-left: 0;
		margin-right: 0;
		padding-left: $padding-small;
		padding-right: $padding-small;
	}

	article {
		@extend %card;
		margin: $padding 0;
		margin-left: 3px;
		margin-right: 3px;
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		
		p {
			padding: $padding;
			margin: 0;
		}
	}
</style>