<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	// SMUI components
	import Card, { PrimaryAction } from '@smui/card';
	// Variables
	let tournamentList = getTournamentList(`https://${$page.params.apiUrl}/${$page.params.username}`);
	// Functions
	import { getTournamentList } from './scripts/api';

    function finishedTournamentsFilter(e: shortTournament): boolean {
        let days = 3;
        return !e.active && Date.now() / 1000 <= e.t_end + 86400 * days && e.t_start <= Date.now() / 1000;
    }
</script>

<h2>Vælg en turnering</h2>
<div>
	{#await tournamentList then tournamentList}
		{#each tournamentList.filter((e) => e.active) as tournament}
			<Card>
				<PrimaryAction
					padded
					on:click={() => (location.href = `${$page.url.pathname}/${tournament.tournament_id}`)}
					style="text-align: center; font-family: Roboto;"
				>
					{tournament.tournament_name}
				</PrimaryAction>
			</Card>
		{:else}
			Der er ingen aktive turneringer
		{/each}
        {#if tournamentList.filter(finishedTournamentsFilter).length !== 0}
            <p>Afsluttede turneringer</p>
            {#each tournamentList.filter(finishedTournamentsFilter) as tournament}
                <Card>
                    <PrimaryAction
                        padded
                        on:click={() => (location.href = `${$page.url.pathname}/${tournament.tournament_id}`)}
                        style="text-align: center; font-family: Roboto;"
                    >
                        {tournament.tournament_name}
                    </PrimaryAction>
                </Card>
            {/each}
        {/if}
	{:catch error}
		<p>{error}</p>
	{/await}
</div>

<style lang="scss">
	@use '@material/typography/index' as typography;

	h2 {
		@include typography.typography('headline5');
		text-align: center;
	}

	div {
		padding: 0 10px;
		display: grid;
		gap: 10px;
	}
</style>
