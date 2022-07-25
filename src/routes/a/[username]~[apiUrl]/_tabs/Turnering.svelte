<script lang="ts">
	// SMUI Components
	import Textfield from '@smui/textfield';
	// Custom Components
	import TimePicker from '../_components/TimePicker.svelte';

	// Variables
	export let tournament: Tournament;
	let files: FileList | null = null;

	// Functions
	$: if (files != null && files.length) {
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			tournament.tournament_image = String(event.target.result);
		};
	}
</script>

<div class="hide-file-ui">
	<Textfield
		variant="filled"
		bind:value={tournament.tournament_name}
		label="Turneringens navn"
		required
		input$maxlength={40}
		style="flex-grow: 1;"
	/>
	<Textfield
		variant="filled"
		bind:value={tournament.tournament_sponsor}
		label="Sponsor"
		style="flex-grow: 1;"
		input$maxlength={40}
	/>
	<Textfield
		variant="filled"
		bind:files
		label="Billede"
		type="file"
		input$accept="image/*"
		style="flex-grow:1;"
	/>
</div>
<div>
	<TimePicker bind:t_start={tournament.t_start} bind:t_end={tournament.t_end} />
</div>
<img
	alt="Billede af turneringen"
	src={tournament.tournament_image ? tournament.tournament_image : '/default-header/medium.webp'}
/>

<style lang="scss">
	img {
		height: 50%;
		width: 100%;
		object-fit: contain;
		object-position: center;
	}

	div {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}
</style>
