<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { activeTournament } from "../persistence/stores";
    import { toISOTs, toUNIXTs } from "../scripts/timeConversion";

    let tStart: string;
    let tEnd: string;

    onMount(() => {
        tStart = toISOTs($activeTournament.t_start)
        tEnd = toISOTs($activeTournament.t_end)
    });

    afterUpdate(() => {
        let copyTournament = $activeTournament
        copyTournament.t_start = toUNIXTs(tStart);
        copyTournament.t_end = toUNIXTs(tEnd);
        activeTournament.set(copyTournament) 
        /* I should really only update the two properties that need to be updated
        but I don't know how to do that
        */
    })
</script>

<label for="t" style="display: grid; grid-template-columns: auto 1fr auto 1fr; gap: 1rem;">Tidspunkt: 
    <input
        type="datetime-local"
        name="t"
        bind:value={tStart}
        required
    />
    -
    <input
        type="datetime-local"
        name="t"
        bind:value={tEnd}
        required
    />
</label>