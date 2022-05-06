<script lang="ts">
	import { page } from '$app/stores';
	import { getHole, submitScore } from '../scripts/api';
	import InputText from '../../../../../static/components/InputText.svelte';
	import InputNumber from '../../../../../static/components/InputNumber.svelte';
	import Modal from '../_components/Modal.svelte';
    import Score from '../_components/Score.svelte';

	let baseUrl: string = `https://${$page.params.apiUrl}/user/`;
	let hole = getHole(baseUrl, $page.params.dbId, Number($page.params.holeNumber));
	let submitting: boolean = false;

	let name: string = '';
	let scoreM: number = 0;
	let scoreCm: number = 0;

	async function submit() {
		await submitScore(baseUrl, $page.params.dbId, Number($page.params.holeNumber), name, scoreM, scoreCm);
	}
</script>

{#await hole}
	<p>Loading...</p>
{:then hole}
	<aside>
		<img
			src={hole.hole_image
				? hole.hole_image
				: '/default-header/medium.webp'}
			alt="Turneringens billede"
		/>
		<div>
			<h1>
				{hole.hole_text ? hole.hole_text : 'Nærmest hullet'}
                <br/>
                Hul {hole.hole_number}
			</h1>
			{#if hole.hole_sponsor}
				<p>
					Sponsoreret af: {hole.hole_sponsor}
				</p>
			{/if}
		</div>
	</aside>

    <main>
        {#each hole.scores.slice(0, 5) as score, i}
            <Score i={i + 1} score={score.player_score} name={score.player_name}/>
        {:else}
            <h2>
                Der er ingen noteringer endnu <br> Vær den første til at indsende en
            </h2>
        {/each}

		<button on:click={() => submitting = true}>
			Indsend notering
		</button>
    </main>
	
	<Modal bind:open={submitting}>
		<h1>
			Indsend notering
		</h1>

		<form on:submit|preventDefault={submit}>
			<InputText label="Navn" bind:value={name} maxlength={40} required/>
		
			<div>
				<InputNumber label="Distance" bind:value={scoreM} min={0} max={10} unit="m" required/>
				<InputNumber label="" bind:value={scoreCm} min={0} max={99} unit="cm" required/>
			</div>

			<button>
				Indsend
			</button>
		</form>
	</Modal>
{:catch error}
	<p>{error}</p>
{/await}

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

    aside {
        @extend %header-image;
    }

    main {
        @extend %header-image-margin;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        gap: $padding;
    }

	button {
		@include button($primary-color);
		//text-shadow: $shadow-text;
	}

	form {
		display: grid;
		gap: $padding;
		width: 90vw;
		
		div {
			display: grid;
			gap: $padding;
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>