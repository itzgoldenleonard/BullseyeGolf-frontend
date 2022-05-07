<script lang="ts">
	import { page } from '$app/stores';
	import { getHole, submitScore } from '../scripts/api';
	import InputText from '../../../../../static/components/InputText.svelte';
	import InputNumber from '../../../../../static/components/InputNumber.svelte';
	import Modal from '../_components/Modal.svelte';
	import Score from '../_components/Score.svelte';

	let baseUrl: string = `https://${$page.params.apiUrl}/user/`;
	let hole: Promise<Hole>;
	const updateHole = () =>
		(hole = getHole(baseUrl, $page.params.dbId, Number($page.params.holeNumber)));
	let submitting: boolean = false;

	let [name, scoreM, scoreCm] = ['', 0, 0];

	async function submit() {
		if (scoreM === 0 && scoreCm === 0) return alert('Din score må ikke være 0');

		let _hole = await hole;
		if (_hole.scores.length !== 0 && _hole.scores[0].player_score < scoreM + scoreCm * 0.01) {
			if (confirm('Denne score er ikke første plads.\nVil du indsende den alligevel?'))
				name += ' 🏴';
			else return;
		}

		await submitScore(
			baseUrl,
			$page.params.dbId,
			Number($page.params.holeNumber),
			name,
			scoreM,
			scoreCm
		);
		submitting = false;
		updateHole();
		[name, scoreM, scoreCm] = ['', 0, 0];
	}

	updateHole();
</script>

{#await hole}
	<p>Loading...</p>
{:then hole}
	<aside>
		<img
			src={hole.hole_image ? hole.hole_image : '/default-header/medium.webp'}
			alt="Turneringens billede"
		/>
		<div>
			<h1>
				{hole.hole_text ? hole.hole_text : 'Nærmest hullet'}
				<br />
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
			<Score i={i + 1} score={score.player_score} name={score.player_name} />
		{:else}
			<h2>
				Der er ingen noteringer endnu <br /> Vær den første til at indsende en
			</h2>
		{/each}

		<button on:click={() => (submitting = true)}> Indsend notering </button>
	</main>

	<Modal bind:open={submitting}>
		<form on:submit|preventDefault={submit}>
			<h1>Indsend notering</h1>

			<InputText label="Navn" bind:value={name} maxlength={40} required />

			<div>
				<InputNumber label="Distance" bind:value={scoreM} min={0} max={10} unit="m" required />
				<InputNumber label="" bind:value={scoreCm} min={0} max={99} unit="cm" required />
			</div>

			<button> Indsend </button>
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

	button {
		@include button($primary-color);
		font-size: $text-size;
	}

	main {
		@extend %header-image-margin;
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		gap: $padding;
		box-sizing: border-box;
		height: 100%;

		button {
			grid-row: 6/6;
		}
	}

	form {
		display: grid;
		gap: $padding;
		width: 90vw;

		h1 {
			margin: $padding-small 0;
		}

		div {
			display: grid;
			gap: $padding;
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
