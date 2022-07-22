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
				<Textfield variant="filled" bind:value={hole.hole_text} label="Hul tekst" />
				<Textfield variant="filled" bind:value={hole.hole_sponsor} label="Hul sponsor" />
				<Textfield variant="filled" bind:files label="Hul billede" type="file" />
			</div>

			<img
				alt={`Hul ${hole.hole_number} billede`}
				src={hole.hole_image ? hole.hole_image : '/default-header/small.webp'}
			/>

			<ScoreList bind:scores={hole.scores} />
		</article>
	</Content>
</Panel>

<style lang="scss">
	article {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr 1fr;
		gap: 10px;

		div {
			grid-column: 1 / span 2;
		}

		img {
			width: 100%;
		}
	}
</style>
