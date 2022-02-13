<script lang="ts">
	export let value: string;
	export let alt: string;

	function idGenerator(): string {
		return String(Math.floor(Math.random() * 1000000));
	}

	let id = idGenerator();
	/* TODO: I'm thinking that there's a smarter way to target the input field
    Maybe I have to use the two components' relative positions or something,
    I'd rather not generate random IDs*/

	function updateImage(event): void {
		let image = event.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			value = String(event.target.result);
		};
	}
</script>

<img
	{alt}
	src={value ? value : '/default-header/medium.avif'}
	on:click={() => {
		document.getElementById(id).click();
	}}
/>

<input type="file" {id} style="display: none;" accept="image/*" on:change={updateImage} />

<style>
	img {
		max-width: 75%;
		max-height: 50%;
	}
</style>
