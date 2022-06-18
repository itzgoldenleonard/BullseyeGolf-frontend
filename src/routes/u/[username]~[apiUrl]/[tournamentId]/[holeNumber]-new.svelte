<script lang="ts">
	import { page } from '$app/stores';
    import { topBarTitle } from '../__layout.svelte';
	import { getHole, submitScore } from '../scripts/api';
    import Fab, { Label, Icon } from '@smui/fab';
	import SubmissionDialog from '../_components/SubmissionDialog.svelte';
	import ScoreList from '../_components/ScoreList.svelte';
    import HeroImage from '../_components/HeroImage.svelte';
	let submitting: boolean = false;

	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;

	function submitHandler(e: CustomEvent<{ name: string; scoreM: number; scoreCm: number }>) {
		console.log(e.detail);
	}

	let hole: Hole = { scores: [] };
	let loaded: boolean = false;
	const updateHole = async () => {
		loaded = false;
		hole = await getHole(baseUrl, $page.params.tournamentId, Number($page.params.holeNumber));
        topBarTitle.set(`Hul ${hole.hole_number}`)
		loaded = true;
	};

	updateHole();
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
