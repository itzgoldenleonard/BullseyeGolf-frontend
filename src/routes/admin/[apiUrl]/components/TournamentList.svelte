<script lang="ts">
	// # Imports
	import TournamentListElement from './TournamentListElement.svelte';
	import { tournamentList, activeTournament } from '../persistence/stores';
	import { getTournament } from '../scripts/api';
	import { createDefaultTournament } from '../scripts/misc';
	import { updateTournamentList } from '../scripts/misc'
	// # Exports
	export let baseUserUrl: string;

	updateTournamentList(baseUserUrl);

	async function pick(event: { detail: string }): Promise<void> {
		activeTournament.set(null);
		activeTournament.set(await getTournament(baseUserUrl, event.detail));
	}

	async function create(): Promise<void> {
		activeTournament.set(null);
		activeTournament.set(await createDefaultTournament());
	}
</script>

<div>
	{#await $tournamentList}
		<p>loading...</p>
	{:then tournamentList}
		{#each tournamentList as tournament}
			{#if tournament.active}
				<TournamentListElement {tournament} on:pick={pick} />
			{/if}
		{/each}

		<details>
			<summary>Fremtidige turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && Date.now() < tournament.t_start * 1000}
					<TournamentListElement {tournament} on:pick={pick} />
				{/if}
			{/each}
		</details>

		<details>
			<summary>Afsluttede turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && tournament.t_end * 1000 < Date.now()}
					<TournamentListElement {tournament} on:pick={pick} />
				{/if}
			{/each}
		</details>

		<button on:click={create}> + </button>
	{:catch error}
		{error}
	{/await}
</div>
