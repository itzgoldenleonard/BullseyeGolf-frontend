<script lang="ts">
	// # Imports
	import TournamentListElement from './TournamentListElement.svelte';
	import { tournamentList, activeTournament, formChanged, selectedTournament } from '../persistence/stores';
	import { getTournament } from '../scripts/api';
	import { createDefaultTournament } from '../scripts/misc';
	import { updateTournamentList } from '../scripts/misc';
	import HoleSelector from './HoleSelector.svelte';
	// # Exports
	export let baseUserUrl: string;
	let openFolds: boolean[] = [true, false, false];

	updateTournamentList(baseUserUrl);

	async function pick(event: { detail: string }): Promise<void> {
		if (
			$formChanged &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		)
			return;
		formChanged.set(false);
		activeTournament.set(null);
		$selectedTournament = event.detail;
		activeTournament.set(await getTournament(baseUserUrl, event.detail));
	}

	async function create(): Promise<void> {
		if (
			$formChanged &&
			!confirm(
				'Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet'
			)
		)
			return;
		formChanged.set(false);
		activeTournament.set(null);
		selectedTournament.set('');
		activeTournament.set(await createDefaultTournament());
	}
</script>

<main>
	{#await $tournamentList}
		<p>loading...</p>
	{:then tournamentList}
	<div>
		<details bind:open={openFolds[0]}>
			<summary>Aktive turneringer</summary>
			{#each tournamentList as tournament}
				{#if tournament.active}
					<TournamentListElement {tournament} on:pick={pick} />
				{/if}
			{/each}
		</details>

		<details bind:open={openFolds[1]}>
			<summary>Fremtidige turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && Date.now() < tournament.t_start * 1000}
					<TournamentListElement {tournament} on:pick={pick} />
				{/if}
			{/each}
		</details>

		<details bind:open={openFolds[2]}>
			<summary>Afsluttede turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && tournament.t_end * 1000 < Date.now()}
					<TournamentListElement {tournament} on:pick={pick} />
				{/if}
			{/each}
		</details>
	</div>
	{#if $activeTournament !== null}
		<HoleSelector />
	{/if}
	<button on:click={create}> + </button>
	{:catch error}
		{error}
	{/await}
</main>

<style lang="scss"> 
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	main {
		grid-area: nav;
		background-color: $foreground-color;
		padding-top: $padding;
		position: relative;
		overflow-y: hidden;
		
		div {
			overflow-y: auto;
		}
		display: grid;
		grid-template-rows: 1fr auto auto;
		grid-template-areas: 
		"tournaments"
		"holeselector"
		"button";
		box-shadow: $shadow-medium;
	}

	summary {
		@extend %tournament-list;
	}

	button {
		@extend %button-hilighted;
		margin: $padding;
		padding: $padding/2;
		font-size: 18pt;
		font-weight: 900;
	}
</style>