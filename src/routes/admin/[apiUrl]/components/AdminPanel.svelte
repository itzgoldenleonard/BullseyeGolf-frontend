<script lang="ts">
	import HoleSelector from './HoleSelector.svelte';
	import TournamentEditor from './TournamentEditor.svelte';
	import { activeTournament } from '../persistence/stores';

	export let baseUserUrl: string;
	export let baseAdminUrl: string;
</script>

<main>
	{#if $activeTournament === null}
		<p>Vaelg en turnering</p>
	{:else}
		<HoleSelector />
		<TournamentEditor {baseUserUrl} {baseAdminUrl} />
	{/if}
</main>
