<script lang="ts">
	import { page } from '$app/stores';
	import { getTournamentList } from './scripts/api';
	let tournamentList = getTournamentList(`https://${$page.params.apiUrl}/${$page.params.username}`);

    // SMUI components
    import Card, { PrimaryAction } from '@smui/card';
</script>

<h2>Vælg en turnering</h2>
{#await tournamentList}
{:then tournamentList}
	{#each tournamentList.filter((e) => e.active) as tournament}
        <div>
            <Card>
                <PrimaryAction padded on:click={() => location.href=`${$page.url.pathname}/${tournament.tournament_id}`} style="text-align: center; font-family: Roboto;">
                    {tournament.tournament_name}
                </PrimaryAction>
            </Card>
        </div>
	{:else}
		Der er ingen aktive turneringer
	{/each}
{:catch error}
	<p>{error}</p>
{/await}

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
