<script lang="ts">
	import Textfield from '@smui/textfield';

	// All this is very temporary to just get the image to work
	let valueTypeFiles: FileList | null = null;
	let img = '';

	$: if (valueTypeFiles != null && valueTypeFiles.length) {
		console.log(valueTypeFiles);

		let reader = new FileReader();
		reader.readAsDataURL(valueTypeFiles[0]);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			img = String(event.target.result);
		};
	}
</script>

<article>
	<div class="hide-file-ui">
		<Textfield variant="filled" value="" label="Turneringens navn" style="flex-grow: 1;" />
		<Textfield variant="filled" value="" label="Sponsor" style="flex-grow: 1;" />
		<Textfield
			variant="filled"
			bind:files={valueTypeFiles}
			label$placeholder="Tryk for at vælge et billede"
			value=" "
			label="Billede"
			type="file"
			style="flex-grow:1;"
		/>
	</div>
	<div>
		<Textfield
			variant="filled"
			value=""
			label="Start tidspunkt"
			type="datetime-local"
			style="flex-grow:1;"
		/>
		<Textfield
			variant="filled"
			value=""
			label="Slut tidspunkt"
			type="datetime-local"
			style="flex-grow:1;"
		/>
	</div>
	<img alt="Billede af turneringen" src={img ? img : '/default-header/medium.webp'} />
</article>

<style lang="scss">
	article {
		overflow-x: hidden;
		overflow-y: auto;
		padding-inline: 10px;
		padding-top: 10px;
		box-sizing: border-box;
		height: 100%;
		gap: 10px;
		display: flex;
		flex-direction: column;

		img {
			height: 50%;
			max-width: 100%;
			object-fit: contain;
			object-position: center;
		}

		div {
			display: flex;
			gap: 10px;
		}
	}
</style>
