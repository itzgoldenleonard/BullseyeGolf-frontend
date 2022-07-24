<script lang="ts">
	import Textfield from '@smui/textfield';
	import { Panel, Header, Content } from '@smui-extra/accordion';

	import ScoreList from '../_components/ScoreList.svelte';

	export let hole: Hole;

	let files: FileList | null = null;

	$: if (files != null && files.length) {
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			hole.hole_image = String(event.target.result);
		};
	}
</script>

<Panel>
	<Header>Hul {hole.hole_number}</Header>
	<Content>
		<article>
			<div class="hide-file-ui">
				<Textfield
					variant="filled"
					bind:value={hole.hole_text}
					style="flex-grow: 1;"
					label="Hul tekst"
					input$maxlength={40}
				/>
				<Textfield
					variant="filled"
					bind:value={hole.hole_sponsor}
					style="flex-grow: 1;"
					label="Hul sponsor"
					input$maxlength={40}
				/>
				<Textfield
					variant="filled"
					bind:files
					label="Hul billede"
					style="flex-grow: 1;"
					type="file"
					input$accept="image/*"
				/>
			</div>

			<ScoreList bind:scores={hole.scores} />

			<img
				alt={`Hul ${hole.hole_number} billede`}
				src={hole.hole_image ? hole.hole_image : '/default-header/small.webp'}
			/>
		</article>
	</Content>
</Panel>

<style lang="scss">
	article {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr auto;
		gap: 10px;

		@media only screen and (max-width: 480px) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}

		div {
			display: flex;
			gap: 10px;
			grid-column: 1 / span 2;
			@media only screen and (max-width: 480px) {
				grid-column: unset;
			}
		}

		img {
			width: 100%;
			height: 200px;
		}
	}
</style>
