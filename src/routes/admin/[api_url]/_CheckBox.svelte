<script lang="ts">
    //import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    export var hole_number: int;
    export var checked;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('check', {
            checked: checked,
            hole_number: hole_number
        });
    }
</script>

<label style="display: grid; grid-template-columns: auto 1fr; grid-gap: 1rem;">
    Test {hole_number}: 
    <input type="checkbox" bind:checked={checked} on:click={handleClick}/>
</label>
