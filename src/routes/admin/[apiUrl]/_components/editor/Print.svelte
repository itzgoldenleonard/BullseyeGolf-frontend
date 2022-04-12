<script lang="ts">
    import { activeTournament } from "../../persistence/stores";
</script>

{#if $activeTournament !== null}
<main>
    <div id="correct">
        <h1>
            {$activeTournament.tournament_name}
        </h1>
        
        {#each $activeTournament.holes as hole}
            <h2>
                hul {hole.hole_number}
            </h2>
            <table>
                <tr>
                    <th>
                        Navn:
                    </th>
                    <th>
                        Score:
                    </th>
                </tr>
                {#each hole.scores as score}
                    <tr>
                        <td>
                            {score.player_name}
                        </td>
                        <td>
                            {score.player_score}
                        </td>
                    </tr>
                {/each}
            </table>
        {/each}
    </div>
    
    <h1 id="incorrect">
        For at printe skal du bruge stående A4 størrelse og slå marginer fra
    </h1>
</main>
{:else}
    <h1>
        Du har ikke valgt nogen turnering
    </h1>
{/if}

<style lang="scss">
    main {
        position: absolute;
        top: 0;
        left: 0;
        padding: 12.5mm;
        width: 210mm;
        background: white;
        color: black;
        
        // logic
        #incorrect {
            display: none;
        }
        
        @media only screen {
            display: none;
        }

        @media only print and (max-width: 209mm), only print and (min-width: 211mm), only print and (orientation: landscape) {
            width: 100vw;
            #correct {
                display: none;
            }
            #incorrect {
                display: block;
            }
        }
    }

    h1 {
        @media only screen {
            display: none;
        }
    }
</style>