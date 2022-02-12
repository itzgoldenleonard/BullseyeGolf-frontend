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
        $activeTournament.t_start = toUNIXTs(tStart)
        $activeTournament.t_end = toUNIXTs(tEnd)
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