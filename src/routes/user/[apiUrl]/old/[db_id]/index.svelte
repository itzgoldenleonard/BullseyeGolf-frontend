<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
	import HoleCard from './_HoleCard.svelte';

	var api_url: string;
	api_url = `https://${$page.params.api_url}/user/${$page.params.db_id}`;

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

	var database = fetch();
</script>

<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
</head>

<h1 class="generic-title" style="text-align: center;">Vælg et hul her:</h1>

{#await database}
	<p>loading...</p>
{:then database}
	<div class="hole-card-grid">
		{#each database.holes as db}
			<HoleCard hole={db.hole_number} db_id={$page.params.db_id} />
		{/each}
	</div>
{:catch error}
	<p>
		{error}
	</p>
{/await}
