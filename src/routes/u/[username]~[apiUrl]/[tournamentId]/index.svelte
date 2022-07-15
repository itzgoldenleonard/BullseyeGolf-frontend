<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	// SMUI Components
	import Card, { PrimaryAction } from '@smui/card';
	// Custom Components
	import HeroImage from '../_components/HeroImage.svelte';
	// Functions
	import { getTournament } from '../scripts/api';

	let tournament = getTournament(
		`https://${$page.params.apiUrl}/${$page.params.username}`,
		$page.params.tournamentId
	);
</script>

{#await tournament then tournament}
	<HeroImage
		src={tournament.tournament_image}
		sponsor={tournament.tournament_sponsor}
		title={tournament.tournament_name}
	>
		<h2>Vælg et hul</h2>
		<div>
			{#each tournament.holes as hole}
				<Card>
					<PrimaryAction
						padded
						on:click={() => (location.href = `${$page.url.pathname}/${hole.hole_number}`)}
						style="text-align: center; font-family: Roboto;"
					>
						Hul {hole.hole_number}
					</PrimaryAction>
				</Card>
			{:else}
				Der er ingen huller i denne turnering
			{/each}
		</div>
	</HeroImage>
{:catch error}
	{error}
{/await}

<style lang="scss">
	@use '@material/typography/index' as typography;

	h2 {
		@include typography.typography('headline5');
		text-align: center;
	}

	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 0.5fr));
		gap: 10px;
	}
</style>
