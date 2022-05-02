<script lang="ts">
	import { page } from '$app/stores';
	import { getHole } from '../scripts/api';
	let baseUrl: string = `https://${$page.params.apiUrl}/user/`;
    import Score from '../_components/Score.svelte';

	let hole = getHole(baseUrl, $page.params.dbId, Number($page.params.holeNumber));
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
    </main>
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
</style>