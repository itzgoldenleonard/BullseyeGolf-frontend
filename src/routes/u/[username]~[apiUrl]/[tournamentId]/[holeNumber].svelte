<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	// SMUI Components
	import Fab, { Label, Icon } from '@smui/fab';
	// Custom components
	import HeroImage from '../_components/HeroImage.svelte';
	import ScoreList from '../_components/ScoreList.svelte';
	import SubmissionDialog from '../_components/SubmissionDialog.svelte';
	// Functions
	import { getHole, submitScore, getTournamentList } from '../scripts/api';
	import { onMount } from 'svelte';

	// UI Variables
	let submitting: boolean = false;
	let heroImage = { title: '', src: '', sponsor: '' };
	let loading = false;
	let active: boolean;

	// Variables
	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;
	let hole = updateHole();
	hole.then((hole) => {
		heroImage.title = hole.hole_text;
		heroImage.src = hole.hole_image;
		heroImage.sponsor = hole.hole_sponsor;
	});

	// Functions
	async function updateHole(): Promise<Hole> {
		loading = false;
		return getHole(baseUrl, $page.params.tournamentId, Number($page.params.holeNumber));
	}

	async function submitHandler(
		e: CustomEvent<{ name: string; scoreM: number; scoreCm: number }>
	): Promise<void> {
		let _hole = await hole;
		if (
			_hole.scores.length !== 0 &&
			_hole.scores[0].player_score <= e.detail.scoreM + e.detail.scoreCm * 0.01
		) {
			if (confirm('Denne score er ikke første plads.\nVil du indsende den alligevel?'))
				e.detail.name += ' 🏴';
			else return;
		}
		try {
			await submitScore(
				baseUrl,
				$page.params.tournamentId,
				Number($page.params.holeNumber),
				e.detail.name,
				e.detail.scoreM,
				e.detail.scoreCm
			);
		} catch (err: any) {
			submitError(err);
			return;
		}
		submitSuccess();
	}

	function submitSuccess(): void {
		submitting = false;
		hole = updateHole();
	}

	function submitError(err: Error): void {
		alert(err.message);
	}

	// Lifecycle functions
	onMount(async () => {
		let tournamentList = await getTournamentList(baseUrl);
		let currentTournament = tournamentList.find(
			(e) => e.tournament_id === $page.params.tournamentId
		);
		active = currentTournament.active;
	});
</script>

<HeroImage {...heroImage}>
	<ScoreList {hole} bind:loading />
</HeroImage>

{#if active}
	<div class="fab-pos">
		<Fab on:click={() => (submitting = true)} extended class="full-width-if-mobile">
			<Icon class="material-icons">add</Icon>
			<Label>Indsend</Label>
		</Fab>
	</div>

	<SubmissionDialog bind:open={submitting} on:submit={submitHandler} />
{/if}

<style lang="scss">
	.fab-pos {
		position: fixed;
		bottom: 0;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
	}
</style>
