<script lang="ts" context="module">
	export function updateTournamentList(url: string): void {
		tournamentList.set(getTournamentList(url));
	}
</script>

<script lang="ts">
	// # Imports
	import TournamentListElement from './TournamentListElement.svelte';
	import { tournamentList, activeTournament } from '../persistence/stores';
	import { getTournamentList, getTournament } from '../scripts/api';

	// # Exports
	export let baseUserUrl: string;

	updateTournamentList(baseUserUrl);

	async function onPick(event: { detail: string }): Promise<void> {
		activeTournament.set(null);
		activeTournament.set(await getTournament(baseUserUrl, event.detail));
	}
</script>

<div>
	{#await $tournamentList}
		<p>loading...</p>
	{:then tournamentList}
		{#each tournamentList as tournament}
			{#if tournament.active}
				<TournamentListElement {tournament} on:pick={onPick} />
			{/if}
		{/each}

		<details>
			<summary>Fremtidige turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && Date.now() < tournament.t_start * 1000}
					<TournamentListElement {tournament} on:pick={onPick} />
				{/if}
			{/each}
		</details>

		<details>
			<summary>Afsluttede turneringer</summary>
			{#each tournamentList as tournament}
				{#if !tournament.active && tournament.t_end * 1000 < Date.now()}
					<TournamentListElement {tournament} on:pick={onPick} />
				{/if}
			{/each}
		</details>

		<button> + </button>
	{:catch error}
		{error}
	{/await}
</div>
