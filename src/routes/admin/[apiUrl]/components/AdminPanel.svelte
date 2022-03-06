<script lang="ts">
	import HoleSelector from './HoleSelector.svelte';
	import TournamentEditor from './TournamentEditor.svelte';
	import { activeTournament, formChanged } from '../persistence/stores';

	export let baseUserUrl: string;
	export let baseAdminUrl: string;

	function beforeunload(event) {
		if ($formChanged) {
			event.preventDefault();
		}
		event.returnValue = '';
		return '...';
	}
</script>

<svelte:window on:beforeunload={beforeunload} />
	{#if $activeTournament === null}
		<p>Vaelg en turnering</p>
	{:else}
	<main>
		<TournamentEditor {baseUserUrl} {baseAdminUrl} />
	</main>
	{/if}
	
<style lang="scss">
	@import '../../../../../static/_variables';

	main {
		grid-area: content;
		display: grid;
		grid-template-columns: minmax(400px, 1fr);
		grid-template-areas: 
		"editor";
		
		margin: $gap;
		gap: $gap;
		overflow-y: hidden;
	}
</style>
