<script lang="ts">
	import { page } from '$app/stores';
	import { getTournament } from '../scripts/api';
    import HeroImage from '../_components/HeroImage.svelte';
	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;

	let tournament = getTournament(baseUrl, $page.params.tournamentId);
</script>

{#await tournament}
	<p>Loading...</p>
{:then tournament}
    <HeroImage src={tournament.tournament_image} sponsor={tournament.tournament_sponsor} title={tournament.tournament_name}>
        <main>
            <h2 class="header-image-margin">Vælg et hul:</h2>
            {#each tournament.holes as hole}
                <a href={`${$page.url.pathname}/${hole.hole_number}`}>
                    <article>
                        Hul {hole.hole_number}
                    </article>
                </a>
            {:else}
                <h2>Der er ingen huller i denne turnering</h2>
            {/each}
        </main>
    </HeroImage>
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
