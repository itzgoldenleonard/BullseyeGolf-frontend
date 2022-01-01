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
    var db_id: string;

    async function pick_tournament(event) {
        db_id = event.detail.db_id;

        try {
            var request_url: string = api_url + `user/${db_id}`;
            const response = await axios.get(request_url);
            current_tournament = response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async function submit_tournament() {
        try {
            var request_url: string = api_url + `admin/${$page.params.api_key}/${db_id}`;
            const response = await axios.post(request_url, current_tournament);
            tournamentList = get_tournamentList();
            return response.data();
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
            <form on:submit|preventDefault={submit_tournament}>
                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                    Turneringens navn: 
                    <input type="text" bind:value={current_tournament.tournament_name} maxlength="40" required/>
                </label>

                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                    Turnering sponsor: 
                    <input type="text" bind:value={current_tournament.tournament_sponsor} maxlength="40" required/>
                </label>

                <br/>

                {#each current_tournament.holes as hole}
                    <b>Hul {hole.hole_number}:</b> <br/>
                    <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                        Hul sponsor: 
                        <input type="text" bind:value={hole.hole_sponsor} maxlength="40"/>
                    </label>

                {/each}

                <input type="submit" value="Anvend" class="small-hilighted-button submit-screen-button">
            </form>
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
