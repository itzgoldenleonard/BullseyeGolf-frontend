<script lang="ts">
	import { page } from '$app/stores';
	import { getTournament } from '../scripts/api';
	let baseUrl: string = `https://${$page.params.apiUrl}/user/`;

	let tournament = getTournament(baseUrl, $page.params.dbId);
</script>

<body>
	<h1>Vælg et hul:</h1>
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
				<a href={`./${tournament.db_id}/${hole.hole_number}`}>
					<article>
						Hul {hole.hole_number}
					</article>
				</a>
			{/each}
		</main>
	{:catch error}
		<p>{error}</p>
	{/await}
</body>

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	body {
		@extend %body;
		height: auto;
		width: auto;
		padding: $padding;

		h1 {
			font-size: $h1-size;
			font-weight: 600;
			margin: 0;
		}

		> h1 {
			margin-top: 100vw * 0.66;
			@media only screen and (orientation: landscape) {
				margin-top: 100vw * 0.2;
			}
		}

		main {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
			gap: $padding;
			margin: $padding 0;

			a {
				color: $text-color;
				text-decoration: none;
				font-size: $h3-size;
				font-weight: 600;
			}

			article {
				@extend %card;
				display: flex;
				aspect-ratio: 1;
				justify-content: center;
				align-items: center;
			}
		}

		aside {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;

			img,
			div {
				position: absolute;
				width: 100%;
				object-fit: cover;
				aspect-ratio: 3/2;

				@media only screen and (orientation: landscape) {
					aspect-ratio: 5/1;
				}
			}

			div {
				background: linear-gradient(-110deg, hsla(0, 0%, 0%, 0) 35%, 40%, hsla(0, 0%, 0%, 0.712));
				display: grid;
				grid-template-rows: 1fr auto;
				align-items: center;

				h1 {
					margin-left: $padding-large;
					max-width: 60%;
				}
				p {
					margin: $padding;
                    max-width: 80%;
				}
			}
		}
	}
</style>
