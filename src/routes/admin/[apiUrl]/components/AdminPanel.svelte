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
<main>
	{#if $activeTournament === null}
		<p>Vaelg en turnering</p>
	{:else}
		<HoleSelector />
		<TournamentEditor {baseUserUrl} {baseAdminUrl} />
	{/if}
</main>
