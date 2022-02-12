<script lang="ts">
    import { activeTournament } from "../persistence/stores";
    // import { getTournament } from "../scripts/api"
</script>

{#if $activeTournament === null}
    <p>Vaelg en turnering</p>
{:else}
    {#await $activeTournament}
        <p>loading...</p>
    {:then activeTournament} 
        <h1>{activeTournament.db_id}</h1>
        <p>{activeTournament.tournament_name}</p>
    {/await}
{/if}