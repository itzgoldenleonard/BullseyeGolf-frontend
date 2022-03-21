<script lang="ts">
    import { onMount } from "svelte";
	import { page } from '$app/stores';

	onMount(() => {
        //window.print();
        console.log($page.query.getAll('dbId'));
    });
</script>