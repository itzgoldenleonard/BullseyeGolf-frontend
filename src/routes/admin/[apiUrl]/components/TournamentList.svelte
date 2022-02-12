<script lang="ts">
    // # Imports
	import TournamentListElement from './TournamentListElement.svelte';
	import { tournamentList, activeTournament } from '../persistence/stores';
	import { getTournamentList, getTournament } from '../scripts/api';

    // # Exports
	export let baseUserUrl: string;

    tournamentList.set(getTournamentList(baseUserUrl));

    function onPick(event: { detail: string; }): void {
        activeTournament.set(getTournament(baseUserUrl, event.detail))
    }
</script>

<div>
{#await $tournamentList}
	<p>loading...</p>
{:then tournamentList}
	{#each tournamentList as tournament}
		{#if tournament.active}
			<TournamentListElement {tournament} on:pick={onPick}/>
		{/if}
	{/each}

	<details>
		<summary>Fremtidige turneringer</summary>
		{#each tournamentList as tournament}
			{#if !tournament.active && Date.now() < tournament.t_start * 1000}
				<TournamentListElement {tournament} on:pick={onPick}/>
			{/if}
		{/each}
	</details>

	<details>
		<summary>Afsluttede turneringer</summary>
		{#each tournamentList as tournament}
			{#if !tournament.active && tournament.t_end * 1000 < Date.now()}
				<TournamentListElement {tournament} on:pick={onPick}/>
			{/if}
		{/each}
	</details>

	<button> + </button>
{:catch error}
	{error}
{/await}
</div>