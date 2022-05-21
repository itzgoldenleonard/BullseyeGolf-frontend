<script lang="ts">
	import { page } from '$app/stores';
	import { getTournament } from '../scripts/api';
	let baseUrl: string = `https://${$page.params.apiUrl}/user/`;

	let tournament = getTournament(baseUrl, $page.params.dbId);
</script>

<h2 class="header-image-margin">Vælg et hul:</h2>
{#await tournament}
	<p>Loading...</p>
{:then tournament}
	<aside>
		<img
			src={tournament.tournament_image
				? tournament.tournament_image
				: '/default-header/medium.webp'}
			alt="Turneringens billede"
		/>
		<div>
			<h1>
				{tournament.tournament_name}
			</h1>
			{#if tournament.tournament_sponsor}
				<p>
					Sponsoreret af: {tournament.tournament_sponsor}
				</p>
			{/if}
		</div>
	</aside>

	<main>
		{#each tournament.holes as hole}
			<a href={`${$page.path}/${hole.hole_number}`}>
				<article>
					Hul {hole.hole_number}
				</article>
			</a>
		{/each}
	</main>
{:catch error}
	<p>{error}</p>
{/await}

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	.header-image-margin {
		@extend %header-image-margin;
	}

	aside {
		@extend %header-image;
	}

	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 0.5fr));
		gap: $padding;
		margin: $padding 0;

		@media only screen and (orientation: landscape) {
			grid-template-columns: repeat(auto-fit, minmax(100px, 0.25fr));
		}

		a {
			color: $text-color;
			text-decoration: none;

			article {
				@extend %card;
				display: flex;
				aspect-ratio: 1;
				justify-content: center;
				align-items: center;

				font-size: $h3-size;
				font-weight: 600;
			}
		}
	}
</style>
