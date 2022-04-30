<script lang="ts">
	import { page } from '$app/stores';
    import { getTournamentList } from './scripts/api';
    let baseUrl: string = `https://${$page.params.apiUrl}/user/`;

    let tournamentList = getTournamentList(baseUrl);
</script>

<body>
    <h1>
        Vælg en turnering:
    </h1>
    {#await tournamentList}
        <p>loading...</p>
    {:then tournamentList} 
        {#each tournamentList as tournament}
            {#if tournament.active}
                <a href={`./${$page.params.apiUrl}/${tournament.db_id}`}>
                    <article>
                            {tournament.tournament_name}
                    </article>
                </a>
            {/if}
        {/each}
    {:catch error}
        <p>{error}</p>
    {/await}
</body>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

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
        
        a {
            color: $text-color;
            text-decoration: none;
            font-size: $h3-size;
        }

        article {
            @extend %card;
            margin: $padding 0;
        }
    }
</style>