<script lang="ts">
	import { activeTournament, formChanged } from '../../persistence/stores';
	import { postTournament } from '../../scripts/api';
	import TimePicker from './TimePicker.svelte';
	import ImagePicker from '../../../../../../static/components/ImagePicker.svelte';
	import Hole from './Hole.svelte';
	import InputText from '../../../../../../static/components/InputText.svelte';
	import { deleteActiveTournament, generateID, updateTournamentList } from '../../scripts/misc';

	export let baseUserUrl: string;
	export let baseAdminUrl: string;

	function duplciateActiveTournament(): void {
		$activeTournament.db_id = generateID();
		$activeTournament.tournament_name += ' (kopi)';
		submit();
	}

	async function submit(): Promise<void> {
		await postTournament(baseAdminUrl, $activeTournament);
		updateTournamentList(baseUserUrl);
		formChanged.set(false);
	}
</script>

<form on:submit|preventDefault={submit} on:change={() => formChanged.set(true)}>
	<main id="tournament">
		<h1>Turnering</h1>

		<InputText label="Turneringens navn" bind:value={$activeTournament.tournament_name} required maxlength={40} width="100%" />

		<InputText label="Sponsor" bind:value={$activeTournament.tournament_sponsor} maxlength={40} width="100%" />

		<TimePicker />

		<figure>
			<ImagePicker bind:value={$activeTournament.tournament_image} alt="Turneringens billede" />
		</figure>
	</main>

	<main id="holes">
		<h1>Huller</h1>
		<article>
		{#each $activeTournament.holes as hole}
			<Hole bind:hole />
		{/each}
		</article>

		<article id="buttons">
			<button id="duplicate" on:click|preventDefault={duplciateActiveTournament}> Dupliker turnering </button>
			<button id="delete" on:click|preventDefault={() => deleteActiveTournament(baseAdminUrl, baseUserUrl)}> Slet turnering </button>
			<input type="submit" value="Anvend"/>
		</article>
	</main>
</form>
	
<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	form {
		grid-area: editor;
		display: grid;
		grid-template-columns: minmax(400px, 1fr) minmax(400px, 1fr);
		column-gap: $padding;
		grid-template-areas: 
		"tournament holes";
		overflow-y: hidden;

		h1 {
			font-size: $h2-size;
			margin: 0;
			padding-top: $padding;
		}
	}

	#tournament {
		grid-area: tournament;
		@extend %card;
		overflow: hidden;
		
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, auto) 1fr;
		row-gap: $padding-large;
	}

	#holes {
		grid-area: holes;
		@extend %card;
		overflow-y: auto;
		display: grid;
		grid-template-rows: auto 1fr auto;

		input[type=submit] {
			@extend %button-hilighted;
			font-size: $h3-size;
			padding-left: $padding-large;
			padding-right: $padding-large;
		}

		button {
			&#duplicate {
				@include button();
				@extend %selectable;
			}

			&#delete {
				@extend %button-negative;
			}

			font-size: $h3-size;
			padding-left: $padding-large;
			padding-right: $padding-large;
		}
	}

	#buttons {
		display: flex;
		justify-content: end;
		gap: $padding;
	}


	figure {
		position: relative;
		margin: 0;
	}
</style>