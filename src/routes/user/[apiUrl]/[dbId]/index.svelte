<script lang="ts">
	import { page } from '$app/stores';
    import { getTournament } from '../scripts/api';
    let baseUrl: string = `https://${$page.params.apiUrl}/user/`;

    let tournament = getTournament(baseUrl, $page.params.dbId);
</script>

<body>
    <h1>
        Vælg et hul:
    </h1>
    {#await tournament}
        <p>Loading...</p>
    {:then tournament} 
        <!--- Here the tournament image will reside-->

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
    }
</style>