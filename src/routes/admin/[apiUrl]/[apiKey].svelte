<script lang="ts">
	import TournamentList from './components/TournamentList.svelte';
	import AdminPanel from './components/AdminPanel.svelte';
	import { page } from '$app/stores';

	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
	const baseAdminUrl: string = `https://${$page.params.apiUrl}/admin/${$page.params.apiKey}`;
</script>

<div id="page-container">
	<TournamentList {baseUserUrl} />
	<AdminPanel {baseUserUrl} {baseAdminUrl} />
</div>

<style>
	#page-container {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 100vh;
		grid-gap: 10px;
	}
</style>
