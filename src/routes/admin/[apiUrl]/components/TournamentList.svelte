<script lang="ts">
    // # Imports
	import TournamentListElement from './TournamentListElement.svelte';
	import { tournamentList } from '../persistence/stores';
	import { getTournamentList } from '../scripts/api';

    // # Exports
	export let baseUserUrl: string;

    tournamentList.set(getTournamentList(baseUserUrl));
</script>

{#await $tournamentList}
	<p>loading...</p>
{:then tournamentList}
	{#each tournamentList as tournament}
		{#if tournament.active}
			<TournamentListElement content={tournament} />
		{/if}
	{/each}

	<details>
		<summary>Fremtidige turneringer</summary>
		{#each tournamentList as tournament}
			{#if !tournament.active && Date.now() < tournament.t_start * 1000}
				<TournamentListElement content={tournament} />
			{/if}
		{/each}
	</details>

	<details>
		<summary>Afsluttede turneringer</summary>
		{#each tournamentList as tournament}
			{#if !tournament.active && tournament.t_end * 1000 < Date.now()}
				<TournamentListElement content={tournament} />
			{/if}
		{/each}
	</details>

	<button> + </button>
{:catch error}
	{error}
{/await}