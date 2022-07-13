<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	// SMUI Components
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	let topAppBar: TopAppBarComponentDev;
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	// Components
	import InfoDialog from './_components/InfoDialog.svelte';

	// UI Variables
	let open: boolean = false;
	$: topBarTitle = $page.params.holeNumber ? `Hul ${$page.params.holeNumber}` : 'Bullseyegolf';
</script>

<TopAppBar bind:this={topAppBar} variant="fixed" dense>
	<Row>
		<Section>
			{#if $page.params.tournamentId !== undefined}
				<IconButton class="material-icons" aria-label="Go back to the previous page" href="./"
					>arrow_back</IconButton
				>
			{/if}
			<Title>{topBarTitle}</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton
				class="material-icons"
				aria-label="View info about the program"
				on:click={() => {
					open = true;
				}}>info</IconButton
			>
		</Section>
	</Row>
</TopAppBar>
<InfoDialog bind:open />
<AutoAdjust {topAppBar} style="height: 100%; box-sizing: border-box;">
	<slot />
</AutoAdjust>
