<script lang="ts">
	import TournamentList from './_components/sidebar/TournamentList.svelte';
	import AdminPanel from './_components/AdminPanel.svelte';
	import Print from './_components/editor/Print.svelte';
	import { page } from '$app/stores';

	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
	const baseAdminUrl: string = `https://${$page.params.apiUrl}/admin/${$page.params.apiKey}`;
</script>

<body>
	<TournamentList {baseUserUrl} />
	<AdminPanel {baseUserUrl} {baseAdminUrl} />
	<Print />
</body>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

	body {
		@extend %body;
		display: grid;
		grid-template-columns: 256px 1fr;
		grid-template-areas: 'nav content';
	}
</style>
