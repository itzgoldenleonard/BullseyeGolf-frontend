<script lang="ts">
	import { activeTournament, formChanged } from '../persistence/stores';
	import { postTournament } from '../scripts/api';
	import TimePicker from './TimePicker.svelte';
	import ImagePicker from './ImagePicker.svelte';
	import Hole from './Hole.svelte';
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

<main>
	<form on:submit|preventDefault={submit} on:change={() => formChanged.set(true)}>
		<h1>Turnering</h1>
		<label for="tournament_name" style="display: grid; grid-template-columns: auto 1fr; gap: 1rem;"
			>Turneringens navn:
			<input
				type="text"
				name="tournament_name"
				bind:value={$activeTournament.tournament_name}
				maxlength="40"
				required
			/>
		</label>

		<label for="tournament_sponsor" style="display: grid; grid-template-columns: auto 1fr; gap: 1rem;"
			>Turneringens sponsor:
			<input
				type="text"
				name="tournament_sponsor"
				bind:value={$activeTournament.tournament_sponsor}
				maxlength="40"
				required
			/>
		</label>

		<TimePicker />

		<ImagePicker bind:value={$activeTournament.tournament_image} alt="Turneringens billede" />

		<h1>Huller</h1>
		{#each $activeTournament.holes as hole}
			<Hole bind:hole />
		{/each}

		<input type="submit" value="Anvend" class="small-hilighted-button submit-screen-button" />
	</form>
	<button on:click={duplciateActiveTournament}> Dupliker turnering </button>
	<button on:click={() => deleteActiveTournament(baseAdminUrl, baseUserUrl)}> Slet turnering </button>
</main>
	
<style lang="scss">
	@import '../../../../../static/_variables';

	main {
		grid-area: editor;
		background-color: $foreground-color;
		border-radius: $border-radius;
		padding: 0 $padding;
		
		overflow-y: scroll;
		// Hide the scrollbar
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>