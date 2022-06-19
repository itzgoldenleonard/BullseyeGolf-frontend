<script lang="ts">
    // Stores
	import { page } from '$app/stores';

    // SMUI Components
    import Fab, { Label, Icon } from '@smui/fab';

    // Custom components
    import HeroImage from '../_components/HeroImage.svelte';
	import ScoreList from '../_components/ScoreList.svelte';
	import SubmissionDialog from '../_components/SubmissionDialog.svelte';

    // UI Variables
	let submitting: boolean = false;
	let loaded: boolean = false;

    // Variables
	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;
	let hole: Hole = { scores: [] };

    // Function declarations and imports
	import { getHole, submitScore } from '../scripts/api';
    import { onMount } from 'svelte';
    async function updateHole(): void;
	async function submitHandler(e: CustomEvent<{ name: string; scoreM: number; scoreCm: number }>): void;
    function submitSuccess(): void;
    function submitError(err: Error): void;


    // Function implementations
    async function updateHole(): void {
		loaded = false;
		hole = await getHole(baseUrl, $page.params.tournamentId, Number($page.params.holeNumber));
		loaded = true;
    }

	async function submitHandler(e: CustomEvent<{ name: string; scoreM: number; scoreCm: number }>): void {
		if (hole.scores.length !== 0 && hole.scores[0].player_score < e.detail.scoreM + e.detail.scoreCm * 0.01) {
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
        } catch (err) {
            submitError(err);
            return;
        }
        submitSuccess();
	}

    function submitSuccess(): void {
        submitting = false;
        updateHole();
    }

    function submitError(err: Error): void {
        alert(err.message);
    }

    onMount(() => {
        updateHole();
    });
</script>

<HeroImage src={hole.hole_image} title={hole.hole_text} >
    <ScoreList scores={hole.scores} bind:loaded />
</HeroImage>


<div class="fab-pos">
    <Fab on:click={() => submitting = true} extended class="full-width-if-mobile">
        <Icon class="material-icons">add</Icon>
        <Label>Indsend</Label>
    </Fab>
</div>

<SubmissionDialog bind:open={submitting} on:submit={submitHandler} />

<style lang="scss">
    .fab-pos {
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }
</style>
