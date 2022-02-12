<script lang="ts">
    import HoleSelector from "./HoleSelector.svelte";
    import TournamentEditor from "./TournamentEditor.svelte";
    
    export let baseUserUrl: string;
    export let baseAdminUrl: string;
</script>

<main>
    <HoleSelector/>
    <TournamentEditor {baseUserUrl} {baseAdminUrl}/>
</main>