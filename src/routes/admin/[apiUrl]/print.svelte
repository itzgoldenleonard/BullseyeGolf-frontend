<script lang="ts">
    import { onMount } from "svelte";
	import { page } from '$app/stores';
    import { getTournament } from './scripts/api'
    import { activeTournament } from "./persistence/stores";
	import { fade } from 'svelte/transition';

	const baseUserUrl: string = `https://${$page.params.apiUrl}/user/`;
    const dbId: string = $page.query.getAll('dbId')[0];
    let afterPrint: boolean = false;

	onMount(async () => {
        activeTournament.set(await getTournament(baseUserUrl, dbId));
    });
</script>

<svelte:window on:afterprint={() => afterPrint = true}/>
{#if $activeTournament !== null && !afterPrint}
<body transition:fade="{{ duration: 100 }}" on:introend={() => window.print()} >
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
</body>
{:else if afterPrint}
<body>

</body>
{:else}
    loading...
{/if}