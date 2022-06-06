<script lang="ts">
	import { page } from '$app/stores';
	import { getHole, submitScore } from '../scripts/api';
    import SubmissionDialog from '../_components/SubmissionDialog.svelte';
    import ScoreList from '../_components/ScoreList.svelte';
    let submitting: boolean = false;

	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;

    function submitHandler(e: CustomEvent<{ name: string, scoreM: number, scoreCm: number}>) {
        console.log(e.detail);
    }

	let hole: Hole = {scores: []};
    let loaded: boolean = false;
	const updateHole = async () => {
        loaded = false;
		hole = await getHole(baseUrl, $page.params.tournamentId, Number($page.params.holeNumber));
        loaded = true;
    }

    updateHole();
</script>

<SubmissionDialog bind:open={submitting} on:submit={submitHandler} />

<button on:click={() => submitting = true} style="padding: 100px;">Submit</button>

<ScoreList scores={hole.scores} bind:loaded/>
