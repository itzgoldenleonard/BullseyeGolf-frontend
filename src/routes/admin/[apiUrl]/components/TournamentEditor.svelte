<script lang="ts">
	import { activeTournament, formChanged } from '../persistence/stores';
	import { postTournament } from '../scripts/api';
	import TimePicker from './TimePicker.svelte';
	import ImagePicker from './ImagePicker.svelte';
	import Hole from './Hole.svelte';
	import InputText from './InputText.svelte';
	import { deleteActiveTournament, generateID, updateTournamentList } from '../scripts/misc';

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

		<ImagePicker bind:value={$activeTournament.tournament_image} alt="Turneringens billede" />
	</main>

	<main id="holes">
		<h1>Huller</h1>
		{#each $activeTournament.holes as hole}
			<Hole bind:hole />
		{/each}

		<button on:click|preventDefault={duplciateActiveTournament}> Dupliker turnering </button>
		<button on:click|preventDefault={() => deleteActiveTournament(baseAdminUrl, baseUserUrl)}> Slet turnering </button>
		<input type="submit" value="Anvend"/>
	</main>
</form>
	
<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	form {
		grid-area: editor;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: $padding;
		grid-template-areas: 
		"tournament holes";

		h1 {
			font-size: $h2-size;
			margin: 0;
			padding-top: $padding-large;
		}
	}

	#tournament {
		grid-area: tournament;
		@extend %card;
		@extend %y-scroll;
		
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, auto) 1fr;
		row-gap: $padding-large;
	}

	#holes {
		grid-area: holes;
		@extend %card;
		@extend %y-scroll;
	}

	input[type=submit] {
		@extend %button-hilighted;
	}
</style>