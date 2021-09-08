<script lang="ts">
	import axios from 'axios'
    import { page } from '$app/stores';
	import Scoreboard from './_Scoreboard.svelte';

	function sleep(ms) { //only used for testing purposes (my computer is too fast 😢)
  		return new Promise(resolve => setTimeout(resolve, ms));
	}

	var api_url: string;
    api_url = `http://${$page.params.api_url}/user/${$page.params.db_id}`

	async function fetch() {
		try {
			const response = await axios.get(api_url);
			await sleep(500); //this is just so that I can see what the loading screen looks like
			//console.log(response.data)
			return(response.data);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	var database = fetch()
</script>

{#await database}
<p>loading...</p>

{:then database} 

<Scoreboard database={database}/>

{:catch error}
<p>
	{error}
</p>

{/await}