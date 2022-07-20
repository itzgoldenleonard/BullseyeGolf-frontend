<script lang="ts">
	import Textfield from '@smui/textfield';

    // All this is very temporary to just get the image to work
    let valueTypeFiles: FileList | null = null;
    let img = "";

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
    <img alt="Billede af turneringen" src={img ? img : '/default-header/medium.webp'} />
    <div class="hide-file-ui">
        <Textfield variant="filled" value="" label="Turneringens navn" style="flex-grow: 1;"/>
        <Textfield variant="filled" value="" label="Sponsor" style="flex-grow: 1;"/>
        <Textfield variant="filled" bind:files={valueTypeFiles} value="" label="Billede" type="file" style="flex-grow:1;" />
    </div>
    <div>
        <Textfield variant="filled" value="" label="Start tidspunkt" type="datetime-local" style="flex-grow:1;" />
        <Textfield variant="filled" value="" label="Slut tidspunkt" type="datetime-local" style="flex-grow:1;" />
    </div>
</article>

<style lang="scss">
	.hide-file-ui :global(input[type='file']::file-selector-button) {
		display: none;
	}

	.hide-file-ui :global(:not(.mdc-text-field--label-floating) input[type='file']) {
		color: transparent;
	}

    article {
        overflow-x: hidden;
        overflow-y: auto;
        padding-inline: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        img {
            height: 30%;
            object-fit: contain;
        }

        div {
            display: flex;
            gap: 10px;
        }
    }
</style>
