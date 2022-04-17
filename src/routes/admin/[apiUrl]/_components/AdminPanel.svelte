<script lang="ts">
	import TournamentEditor from './editor/TournamentEditor.svelte';
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
	<TournamentEditor {baseUserUrl} {baseAdminUrl} />
{/if}
