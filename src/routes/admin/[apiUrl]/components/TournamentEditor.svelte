<script lang="ts">
    import { activeTournament } from "../persistence/stores";
    import { postTournament } from "../scripts/api"
    import { updateTournamentList } from "./TournamentList.svelte"

    export let baseUserUrl: string;
    export let baseAdminUrl: string;

    async function submit(): Promise<void> {
        postTournament(baseAdminUrl, $activeTournament);
        updateTournamentList(baseUserUrl);
    }
</script>

{#if $activeTournament === null}
    <p>Vaelg en turnering</p>
{:else}
    <form on:submit|preventDefault={submit}>
        <h1>Turnering</h1>
        <label for="tournament_name" style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">Turneringens navn: 
            <input
                type="text"
                name="tournament_name"
                bind:value={$activeTournament.tournament_name}
                maxlength="40"
                required
            />
        </label>

        <label for="tournament_sponsor" style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">Turneringens sponsor: 
            <input
                type="text"
                name="tournament_sponsor"
                bind:value={$activeTournament.tournament_sponsor}
                maxlength="40"
                required
            />
        </label>
        
        <input type="submit" value="Anvend" class="small-hilighted-button submit-screen-button" />
    </form>
{/if}