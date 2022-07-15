<script lang="ts">
	import TournamentList from './_components/sidebar/TournamentList.svelte';
	import AdminPanel from './_components/AdminPanel.svelte';
	import Print from './_components/editor/Print.svelte';
	import { page } from '$app/stores';

	const baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;
</script>

<div id="body">
	<TournamentList {baseUrl} />
	<AdminPanel {baseUrl} />
	<Print />
</div>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

	#body {
		@extend %body;
		display: grid;
		grid-template-columns: 256px 1fr;
		grid-template-areas: 'nav content';
	}
</style>
