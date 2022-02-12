<script lang="ts">
	import TournamentList from './components/TournamentList.svelte';
	import { page } from '$app/stores';

	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
	const baseAdminUrl: string = `https://${$page.params.apiUrl}/admin/${$page.params.apiKey}`;
</script>

<div id="page-container">
	<TournamentList {baseUserUrl} />
</div>
