<script lang="ts">
	import { generateID } from '../../src/routes/a/[username]@[apiUrl]/scripts/misc';

	export let value: string;
	export let alt: string;

	let id = generateID();
	/* TODO: I'm thinking that there's a smarter way to target the input field
    Maybe I have to use the two components' relative positions or something,
    I'd rather not generate random IDs*/

	function updateImage(event: any): void {
		let image = event.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			value = String(event.target.result);
		};
	}
</script>

<img class="selected-image" {alt} src={value ? value : '/default-header/medium.avif'} />

<div
	on:click={() => {
		document.getElementById(id).click();
	}}
>
	<img src="/camera-retake.svg" alt="Change" />
	<p>Klik for at ændre billedet</p>
</div>

<input type="file" {id} style="display: none;" accept="image/*" on:change={updateImage} />

<style lang="scss">
	@import '../_variables';
	@import '../global.scss';

	img.selected-image {
		position: absolute;
		height: 100%;
		width: 100%;
		object-fit: contain;
	}

	div {
		user-select: none;
		cursor: pointer;
		opacity: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.349);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		will-change: opacity;
		transition: opacity $fast-animation ease-in-out;

		&:hover {
			opacity: 1;
		}

		img {
			max-height: 50%;
			max-width: 50%;
			height: 256px;
		}
	}
</style>
