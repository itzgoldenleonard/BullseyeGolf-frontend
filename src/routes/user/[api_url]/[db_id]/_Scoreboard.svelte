<script lang="ts">
	export let database;

	import { show_submit_screen, show_info_screen } from './stores';

	function handle_submit() {
		show_submit_screen.set(true);
	}

	function handle_info() {
		show_info_screen.set(true);
	}
</script>

<head>
	<link rel="stylesheet" type="text/css" href="/global.css" />
	<link href="https://fonts.googleapis.com/css?family=Noto Sans" rel="stylesheet" />
</head>

<div id="L_container">
	<header>
		<a href="./">
			<img class="logo" src="/logo-temp.svg" alt="" />
		</a>

		<svg class="info-button" viewBox="0 0 24 24" on:click={handle_info}>
			<path
				fill="currentColor"
				d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
			/>
		</svg>
	</header>

	<div id="L_title" class="image-shade">
		<h1 class="main-heading">
			{#if database.hole_text == ''}
				Nærmest hullet
			{:else}
				{database.hole_text}
			{/if}
			<br /> Hul {database.hole_number}
		</h1>
	</div>

	{#if database.hole_image == ''}
		<picture class="header-image">
			<source type="image/avif" srcset="/default-header/large.avif" />
			<source type="image/webp" srcset="/default-header/large.webp" />
			<img
				src="/default-header/large.jpg"
				srcset="/default-header/large.png"
				alt=""
				class="header-image"
			/>
		</picture>
	{:else}
		<img src={database.hole_image} alt="" class="header-image" />
	{/if}

	<main id="L_scores">
		{#if database.scores.length == 0}
			<h2 class="no-scores-title">
				Der er ingen noteringer endnu <br />
				Vær den første til at indsende en
			</h2>
		{/if}

		{#if database.scores.length >= 1}
			<div class="score score-1">
				<p class="number">1.</p>
				<p class="name">
					{database.scores[0]['player_name']}
				</p>
				<p class="meters">
					{database.scores[0]['player_score']}m
				</p>
			</div>
		{/if}

		{#if database.scores.length >= 2}
			<div class="score score-2">
				<p class="number">2.</p>
				<p class="name">
					{database.scores[1]['player_name']}
				</p>
				<p class="meters">
					{database.scores[1]['player_score']}m
				</p>
			</div>
		{/if}

		{#if database.scores.length >= 3}
			<div class="score score-3">
				<p class="number">3.</p>
				<p class="name">
					{database.scores[2]['player_name']}
				</p>
				<p class="meters">
					{database.scores[2]['player_score']}m
				</p>
			</div>
		{/if}

		{#if database.scores.length >= 4}
			<div class="score score-4">
				<p class="number">4.</p>
				<p class="name">
					{database.scores[3]['player_name']}
				</p>
				<p class="meters">
					{database.scores[3]['player_score']}m
				</p>
			</div>
		{/if}

		{#if database.scores.length >= 5}
			<div class="score score-4">
				<p class="number">5.</p>
				<p class="name">
					{database.scores[4]['player_name']}
				</p>
				<p class="meters">
					{database.scores[4]['player_score']}m
				</p>
			</div>
		{/if}

		<main id="L_button" class="score submit-button" on:click={handle_submit}>
			<p>Indsend notering</p>
		</main>
	</main>
</div>

<style>
	#L_container {
		display: grid;
		height: 100vh;
		width: 100vw;
		grid-template-columns: 100%;
		grid-template-rows: 5.5vh 27.5vh 67vh;
		grid-template-areas:
			'header'
			'title'
			'scores';
	}

	header {
		grid-area: header;

		display: grid;
		grid-template-columns: calc(5.5vh * 2.5) 1fr 5.5vh;
	}

	#L_title {
		grid-area: title;
	}

	#L_scores {
		grid-area: scores;
	}

	.header-image {
		grid-row: 1 / 2;
		grid-column: 1;
	}

	.info-button {
		grid-column: 3;
	}
</style>
