<script lang="ts">
	import Textfield from '@smui/textfield';
	import TimePicker from '../_components/TimePicker.svelte';
	export let tournament: Tournament;

	let files: FileList | null = null;

	$: if (files != null && files.length) {
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (event) => {
			if (event.total > 1049000) return alert('Billedet skal være mindre end 1MB');
			tournament.tournament_image = String(event.target.result);
		};
	}
</script>

<article>
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
