<script lang="ts">
	import TournamentList from './components/TournamentList.svelte';
	import AdminPanel from './components/AdminPanel.svelte';
	import { page } from '$app/stores';

	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
	const baseAdminUrl: string = `https://${$page.params.apiUrl}/admin/${$page.params.apiKey}`;
</script>

<main>
	<TournamentList {baseUserUrl} />
	<AdminPanel {baseUserUrl} {baseAdminUrl} />
</main>

<style lang="scss">
	@import '../../../../static/_variables';
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 256px 1fr;
		grid-template-areas: 
		"nav content";
		background-color: $background-color;
		color: white;
		
		font-family: 'Roboto', sans-serif;
	}
</style>
