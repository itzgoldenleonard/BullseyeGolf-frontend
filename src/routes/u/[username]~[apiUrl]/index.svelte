<script lang="ts">
	import { page } from '$app/stores';
	import { getTournamentList } from './scripts/api';
	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;

	let tournamentList = getTournamentList(baseUrl);
</script>

<h1>Vælg en turnering:</h1>
{#await tournamentList}
	<p>loading...</p>
{:then tournamentList}
	{#each tournamentList.filter((e) => e.active) as tournament}
		<a href={`${$page.url.pathname}/${tournament.tournament_id}`}>
			<article>
				{tournament.tournament_name}
			</article>
		</a>
	{:else}
		<h2>Der er ingen aktive turneringer</h2>
	{/each}
{:catch error}
	<p>{error}</p>
{/await}

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

	h1 {
		font-size: $h1-size;
		font-weight: 600;
		margin: 0;
		margin-top: 48px;
	}

	a {
		color: $text-color;
		text-decoration: none;
		font-size: $h3-size;

		article {
			@extend %card;
			margin: $padding 0;
		}
	}
</style>
