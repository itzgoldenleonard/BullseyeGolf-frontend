<script lang="ts">
    import { onMount } from "svelte";
    import { activeTournament } from "../persistence/stores";
import CheckBox from "./CheckBox.svelte";

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
</script>

{@debug inactiveHoles}
<p>This is a hole selector</p>

{#each inactiveHoles as inactiveHole}
    <CheckBox checked={!inactiveHole} hole_number="Hul 1"/>
{/each}