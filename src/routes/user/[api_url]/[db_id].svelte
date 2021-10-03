<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
	import { show_submit_screen, show_info_screen } from './stores';
	import Scoreboard from './_Scoreboard.svelte';
	import InfoScreen from './_InfoScreen.svelte';
	import { fade, fly } from 'svelte/transition';

	function sleep(ms) {
		//only used for testing purposes (my computer is too fast 😢)
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	var api_url: string;
	api_url = `http://${$page.params.api_url}/user/${$page.params.db_id}`;

	async function fetch() {
		try {
			const response = await axios.get(api_url);
			//await sleep(500); //this is just so that I can see what the loading screen looks like
			//console.log(response.data)
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}

	var submission_name: string;
	var submission_meters: number;
	var submission_centimeters: number;

	async function add_score() {
		var submission_score: number = submission_meters + (submission_centimeters * 0.01);

		try {
			const response = await axios.post(api_url, {
				name: submission_name,
				score: submission_score
			});
			//console.log(response.data)
			show_submit_screen.set(false);
			database = fetch();
			submission_score = 0;
			submission_name = "";
			submission_meters = 0;
			submission_centimeters = 0;
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}
	var database = fetch();

	function close_submit() {
		show_submit_screen.set(false);
	}
</script>

<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
</head>

{#await database}
	<p>loading...</p>
{:then database}
	<Scoreboard {database} />

	{#if $show_submit_screen}
		<div class="modal-bg" on:click={close_submit} transition:fade={{ duration: 150 }}>
			<div class="modal-container" in:fly={{ y: 50, duration: 150 }} on:click|stopPropagation>
				<h3>Indsend notering</h3>

				<form on:submit|preventDefault={add_score}>
					<label style="display: grid; grid-template-columns: auto 1fr;">
						Navn:
						<input type="text" bind:value={submission_name} maxlength="40" required/>
					</label>
					
					<p>Distance:</p>
					
					<div style="display: grid; grid-template-columns: repeat(2, 1fr)">
						<label>
							<input type="number" bind:value={submission_meters} min="0" max="10" step="1" required class="input-field number-input"/>
							m 
						</label>
					
						<label>
							<input type="number" bind:value={submission_centimeters} min="0" max="99" step="1" class="input-field number-input">
							cm
						</label>
					</div>

					<input type="submit" value="Indsend" class="small-hilighted-button submit-screen-button">
				</form>

			</div>
		</div>
	{:else if $show_info_screen}
		<InfoScreen />
	{/if}
{:catch error}
	<p>
		{error}
	</p>
{/await}
