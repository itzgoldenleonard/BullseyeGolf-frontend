<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
    import TournamentListElement from './_TournamentListElement.svelte';
    import CheckBox from './_CheckBox.svelte';

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
    var inactive_holes = [];

    async function pick_tournament(event) {
        db_id = event.detail.db_id;

        try {
            var request_url: string = api_url + `user/${db_id}`;
            const response = await axios.get(request_url);
            current_tournament = response.data;
            inactive_holes = await mark_active_holes();
        } catch (error) {
            throw new Error(error);
        }
    }

    async function submit_tournament() {
        try {
            var request_url: string = api_url + `admin/${$page.params.api_key}/${db_id}`;
            const response = await axios.post(request_url, current_tournament);
            tournamentList = get_tournamentList();
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async function mark_active_holes() {
        var holes = await current_tournament.holes;
        var checklist = [];

        for (let i = -1; i < 18; i++) {
            checklist.push({"hole_number": i+1,
			"hole_text": "",
			"game_mode": "",
			"hole_sponsor": "",
			"hole_image": "",
			"scores": []});
        }

        for (let element of holes) {
            checklist[element.hole_number] = false;
        }

        return checklist;
    }

    function move_hole(event) {
        if (event.detail.checked) {
            for (let i in current_tournament.holes) {
                if (current_tournament.holes[i].hole_number == event.detail.hole_number) {
                    inactive_holes[event.detail.hole_number] = current_tournament.holes.splice(i, 1)[0];
                    current_tournament.holes[0].game_mode = '';
                }
            }
        } else {
            current_tournament.holes.push(inactive_holes[event.detail.hole_number]);
            inactive_holes[event.detail.hole_number] = false;
            current_tournament.holes[0].game_mode = '';
        }
    }

    async function generate_new_tournament() {
        db_id = `${Math.floor(Math.random()*1000000)}`;

        current_tournament = {"tournament_name": "",
            "t_start": Date.now(),
            "t_end": Date.now() + 86400,
            "tournament_image": "",
            "tournament_sponsor": "",
            "holes": []
        };

        inactive_holes = await mark_active_holes();
    }


    async function delete_tournament() {
        try {
            var request_url: string = api_url + `admin/${$page.params.api_key}/${db_id}`;
            const response = await axios.delete(request_url);
            tournamentList = get_tournamentList();
            current_tournament = 'None';
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    var datetimetest;
    $: datetimeconvtest = new Date(datetimetest);
    $: propertime = Math.floor(datetimeconvtest.getTime()/1000);
</script>


<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
</head>

{@debug propertime}
<div id="page-container">
    <nav class="admin-panel">
        {#await tournamentList}
            <p>loading...</p>
        {:then tournamentList}

            {#each tournamentList as tournament}
                <TournamentListElement on:pick={pick_tournament} content={tournament}/>
            {/each}

            <button on:click={generate_new_tournament}>
                +
            </button>

        {:catch error}
            {error}
        {/await}
    </nav>
    <div id="hole-picker" class="admin-panel">
        {#if current_tournament == 'None'}
            Vælg en turnering
        {:else}
            {#each inactive_holes as boolean, i}
                <CheckBox hole_number={i} checked={!boolean} on:check={move_hole}/>
            {/each}

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

                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                    Start tidspunkt: 
                    <input type="datetime-local" bind:value={datetimetest} required/>
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

            <button on:click={delete_tournament}>
                Slet turnering
            </button>
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
