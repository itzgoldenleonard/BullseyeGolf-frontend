<script lang="ts">
	import { formChanged } from '../../persistence/stores';
	import ImagePicker from '../../../../../../static/components/ImagePicker.svelte';
	import InputText from '../../../../../../static/components/InputText.svelte';

	export let hole: Hole;

	function removeScore(index: number): void {
		hole.scores = hole.scores.filter((e, i) => i !== index); // Removes the element at index and assigns to the array (to update the UI) at the same time
		formChanged.set(true);
	}
</script>

<details>
	<summary>Hul {hole.hole_number}</summary>
	<section>
		<InputText label="Hul sponsor" bind:value={hole.hole_sponsor} maxlength={40} />

		<InputText label="Hul tekst" bind:value={hole.hole_text} maxlength={40} />
		<!--Maybe there should be a placeholder in here-->

		<figure>
			<ImagePicker bind:value={hole.hole_image} alt={`Hul ${hole.hole_number} billede`} />
		</figure>

		<ol>
			{#each hole.scores as score, i}
				<li>
					<p>{score.player_name}</p>
					<p>
						{`${Math.floor(score.player_score)},${String(
							Math.floor((score.player_score % 1) * 100)
						).padStart(2, '0')}`}m
					</p>
					<button on:click|preventDefault={() => removeScore(i)}>x</button>
				</li>
			{:else}
				<p>Der er ingen scorer endnu</p>
			{/each}
		</ol>
	</section>
</details>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	$image-height: 5 * $h3-size + 18 * $padding;

	details {
		margin: $padding 0;

		summary {
			@extend %summary;
			margin-left: 0;
			margin-right: 0;
			padding-left: $padding-small;
			padding-right: $padding-small;
		}

		section {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto 1fr;
			gap: $padding;

			figure {
				height: $image-height;
			}

			ol {
				> p {
					padding: $padding 0;
				}

				overflow-y: auto;
				margin: 0;
				padding: 0;
				height: $image-height;

				li {
					@extend %card;
					margin: $padding 0;
					padding: 0;
					margin-left: 3px;
					margin-right: 3px;
					display: grid;
					grid-template-columns: 1fr 1fr auto;
					align-items: center;

					p {
						padding: $padding;
					}

					button {
						@extend %button-negative;
						padding: $padding-small;
						height: fit-content;
						margin-right: $padding;
					}
				}
			}
		}
	}
</style>
