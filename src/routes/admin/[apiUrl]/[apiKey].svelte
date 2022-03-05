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
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 256px 1fr;
		grid-template-areas: 
		"nav content";
	}
</style>
