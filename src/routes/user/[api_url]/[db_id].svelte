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
	var submission_score: number = 0;

	async function add_score() {
		try {
			const response = await axios.post(api_url, {
				name: submission_name,
				score: submission_score
			});
			//console.log(response.data)
			show_submit_screen.set(false);
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
		<div class="darken" on:click={close_submit} transition:fade="{{ duration: 150}}"></div>
		<div class="submit-bg">
			<div class="submit-container" in:fly="{{ y: 50, duration: 150 }}" out:fade="{{ duration: 150 }}">
				<h3>Indsend notering</h3>

				<p>Navn:</p>

				<input bind:value={submission_name} />

				<p>Distance:</p>

				<label>
					<input type="number" bind:value={submission_score} min="0" max="10" />
					<input type="range" bind:value={submission_score} min="0.01" max="10" step="0.01" />
					<p>m</p>
				</label>

				<button on:click={add_score}>Indsend</button>
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
