<script lang="ts">
	import TournamentEditor from './editor/TournamentEditor.svelte';
	import Tutorial from './editor/Tutorial.svelte';
	import { activeTournament, formChanged } from '../persistence/stores';

	export let baseUrl: string;

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
	<Tutorial />
{:else}
	<TournamentEditor {baseUrl} />
{/if}
