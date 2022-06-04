<script lang="ts">
	import { page } from '$app/stores';
    import SubmissionDialog from "../_components/SubmissionDialog.svelte";
    let submitting: boolean = false;

	let baseUrl: string = `https://${$page.params.apiUrl}/${$page.params.username}`;

    let text: string = "Waiting";

    function submitHandler(e: CustomEvent<{ name: string, scoreM: number, scoreCm: number}>) {
        text = e.detail.name;
    }
</script>

<SubmissionDialog bind:open={submitting} on:submit={submitHandler} />

<button on:click={() => submitting = true} style="padding: 100px;">Submit</button>

{text}
