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

    var form_changed: boolean = false;

    async function pick_tournament(event) {
        db_id = event.detail.db_id;
        unload_function();

        try {
            var request_url: string = api_url + `user/${db_id}`;
            const response = await axios.get(request_url);
            current_tournament = response.data;
            t_start = toISOts(current_tournament.t_start);
            t_end = toISOts(current_tournament.t_end);
            inactive_holes = await mark_active_holes();
        } catch (error) {
            throw new Error(error);
        }
    }

    async function submit_tournament() {
        try {
            var request_url: string = api_url + `admin/${$page.params.api_key}/${db_id}`;
            current_tournament.t_start = toUNIXts(t_start);
            current_tournament.t_end = toUNIXts(t_end);
            const response = await axios.post(request_url, current_tournament);
            tournamentList = get_tournamentList();
            form_changed = false;
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
                    form_changed = true;
                }
            }
        } else {
            current_tournament.holes.push(inactive_holes[event.detail.hole_number]);
            inactive_holes[event.detail.hole_number] = false;
            current_tournament.holes[0].game_mode = '';
            form_changed = true;
        }
    }

    async function generate_new_tournament() {
        db_id = `${Math.floor(Math.random()*1000000)}`;

        current_tournament = {"tournament_name": "",
            "t_start": Math.floor(Date.now()/1000),
            "t_end": Math.floor(Date.now()/1000) + 86400,
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
    

    function toISOts(timestamp) {
        var date = new Date(timestamp*1000);
        return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    }

    function toUNIXts(timestamp) {
        var date = new Date(timestamp);
        return Math.floor(date.getTime()/1000);
    }

    var t_start;
    var t_end;

    const change_image =(event)=> {
        var image = event.target.files[0];
        var target_id = event.target.id;

        var reader = new FileReader();
        reader.readAsDataURL (image);
        reader.onload = event => {
            if (event.total > 1049000) {
                alert("billedet skal være mindre end 1MB")
                return
            } else {
                if (target_id == 'tournament-image-picker') {
                    current_tournament.tournament_image = event.target.result;
                } else {
                    current_tournament.holes[target_id].hole_image = event.target.result;
                }
                form_changed = true;
            }
        };
    }

    function unload_function() {
        // Cancel the event as stated by the standard.
        if (form_changed == true) {
            event.preventDefault();
        }
        // Chrome requires returnValue to be set.
        event.returnValue = '';
        // more compatibility
        return '...';
    }
</script>


<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
</head>

{@debug form_changed}
<svelte:window on:beforeunload={unload_function}/>
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
                {#if i != 0}
                    <CheckBox hole_number={i} checked={!boolean} on:check={move_hole}/>
                {/if}
            {/each}

        {/if}
    </div>

    <main class="admin-panel">
        {#if current_tournament == 'None'}
            Vælg en turnering
        {:else}
            <form on:submit|preventDefault={submit_tournament}>
                <h1> Turnering </h1>
                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                    Turneringens navn: 
                    <input type="text" bind:value={current_tournament.tournament_name} maxlength="40" on:change={() => form_changed = true} required/>
                </label>

                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                    Turnering sponsor: 
                    <input type="text" bind:value={current_tournament.tournament_sponsor} maxlength="40" on:change={() => form_changed = true} required/>
                </label>

                <label style="display: grid; grid-template-columns: auto 1fr auto 1fr; grid-gap: 1rem;">
                    Tidspunkt: 
                    <input type="datetime-local" bind:value={t_start} on:change={() => form_changed = true} required/>
                    -
                    <input type="datetime-local" bind:value={t_end} on:change={() => form_changed = true} required/>
                </label>

                <img on:click={()=>{document.getElementById("tournament-image-picker").click();}} class=tournament-image alt="turnering billede" src={current_tournament.tournament_image ? current_tournament.tournament_image : "/default-header/medium.avif"}/>
                <input style="display:none" id="tournament-image-picker" type="file" accept="image/*" on:change={(event)=>change_image(event)}>

                <h1> Huller </h1>

                {#each current_tournament.holes as hole, i}
                    <details>
                        <summary><b>Hul {hole.hole_number}:</b> </summary>
                        <div class="hole-card">
                            <img class="hole-image" on:click={()=>{document.getElementById(i).click();}} alt={`Hul ${hole.hole_number} billede`} src={hole.hole_image ? hole.hole_image: "/default-header/medium.avif"}/>
                            <input style="display:none" id={i} type="file" accept="image/*" on:change={(event)=>change_image(event)}>

                            <div class="hole-form">
                                <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
                                    Hul sponsor: 
                                    <input type="text" bind:value={hole.hole_sponsor} on:change={() => form_changed = true} maxlength="40"/>
                                </label>

                                {#each hole.scores as score, i}
                                    <div style="display: grid; grid-template-columns: 1fr 1fr auto; grid-gap: 0.5rem; width: 100%;">
                                        <p>{score.player_name}</p>
                                        <p>{score.player_score}</p>
                                        <button style="color: red;" on:click={() => hole.scores.splice(i, 1)}>x</button>
                                    </div>
                                {/each}

                            </div>
                        </div>
                    </details>

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
        grid-template-columns: auto auto 1fr;
        grid-template-rows: 100vh;
        grid-gap: 10px
    }

    .admin-panel {
        border-color: black;
        border-style: solid;
        border-width: 0.2rem;
        border-radius: 1rem;
    }

    .tournament-image {
        width: 50%;
        padding: 1rem;
        aspect-ratio: 3/2;
        object-fit: contain;
    }

    .hole-image {
        width: 40%;
        padding: 0.25rem;
        aspect-ratio: 3/2;
        object-fit: contain;
    }

    .hole-form {
        position: absolute;
        left: 45%;
        top: 0;
    }

    .hole-card {
        position: relative;
    }
</style>
