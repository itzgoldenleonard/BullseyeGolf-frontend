<script lang="ts">
    import { onMount } from "svelte";
    import { activeTournament } from "../persistence/stores";

    let inactiveHoles: Hole[] = [];
    
    onMount(() => {
        for (let i = 0; i < 18; i++) {
            inactiveHoles.push({
                hole_number: i + 1,
                hole_text: '',
                hole_image: '',
                game_mode: '',
                hole_sponsor: '',
                scores: []
            });
        }
        
        for (let hole of $activeTournament.holes) {
            inactiveHoles[hole.hole_number - 1] = null;
        }
    });
    
    function checkHandler(event: any): void {
        let id: number = Number(event.target.id);
        let checked: boolean = event.target.checked;
        if (checked) check(id); else uncheck(id);
    }
    
    function check(id: number): void {
        if (!inactiveHoles[id]) return; // Double check that it hasnt already been moved
        $activeTournament.holes.push(inactiveHoles[id]);
        $activeTournament.tournament_name += ''; // Assign to it to update the UI
        inactiveHoles[id] = null;
    }
    
    function uncheck(id: number): void {
        if (inactiveHoles[id]) return; // Double check that it hasnt already been moved
        for (let i in $activeTournament.holes) {
            if ($activeTournament.holes[i].hole_number - 1 == id) {
                inactiveHoles[id] = $activeTournament.holes.splice(Number(i), 1)[0];
                $activeTournament.tournament_name += ''; // Assign to it to update the UI
            }
        }
    }
</script>

<p>This is a hole selector</p>

{#each inactiveHoles as inactiveHole, i}
    <label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
        Hul {i + 1}:
        <input type="checkbox" checked={!inactiveHole} on:change={checkHandler} id={String(i)}>
    </label>
    <!---<CheckBox bind:checked={inactiveHole} id={i} on:check={checkHandler}/>-->
{/each}