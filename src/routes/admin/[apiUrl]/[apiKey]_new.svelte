<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
	import TournamentListElement from './_TournamentListElement.svelte';

	// # Variables
	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
	const baseAdminUrl: string = `https://${$page.params.apiUrl}/admin/${$page.params.apiKey}`;

	let tournamentList = getTournamentList();

	// # Api functions
	async function getTournamentList(): Promise<ShortTournament[]> {
		try {
			const response = await axios.get(baseUserUrl);
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}
</script>

<div id="page-container">
	<nav class="admin-panel">
		{#await tournamentList}
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
	</nav>
</div>
