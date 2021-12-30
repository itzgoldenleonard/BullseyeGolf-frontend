<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
    import TournamentListElement from './_TournamentListElement.svelte';

    var api_url: string = `https://${$page.params.api_url}/`;

    async function get_tournamentList() {
        try {
            var request_url: string = api_url + 'user/';
            const response = await axios.get(request_url);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    var tournamentList = get_tournamentList();
    var current_tournament = "None";

    async function pick_tournament(event) {
        var db_id: string = event.detail.db_id;

        try {
            var request_url: string = api_url + `user/${db_id}`;
            const response = await axios.get(request_url);
            current_tournament = response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
</script>


<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
</head>


<div id="page-container">
    <nav class="admin-panel">
        {#await tournamentList}
            <p>loading...</p>
        {:then tournamentList}

            {#each tournamentList as tournament}
                <TournamentListElement on:pick={pick_tournament} content={tournament}/>
            {/each}

        {:catch error}
            {error}
        {/await}
    </nav>
    <div id="hole-picker" class="admin-panel">
        {#if current_tournament == 'None'}
            Vælg en turnering
        {:else}
            {current_tournament.tournament_name}
        {/if}
    </div>
    <main class="admin-panel">
        {#if current_tournament == 'None'}
            Vælg en turnering
        {:else}
            {current_tournament.tournament_name}
        {/if}
    </main>

</div>



<style>
    #page-container {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        grid-template-rows: 100vh;
        grid-gap: 10px
    }

    .admin-panel {
        border-color: black;
        border-style: solid;
        border-width: 0.2rem;
        border-radius: 1rem;
    }
</style>
