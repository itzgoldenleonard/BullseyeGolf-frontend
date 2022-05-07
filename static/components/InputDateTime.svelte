<script lang="ts">
	// This is an exact copy of InputText.svelte (exept for the input type and this comment), to make changes, do it in InputText.svelte and copy them to here.
	export let value: string;
	export let label: string = '';
	export let required: boolean = false;
	export let maxlength: number = 100;
	export let width: string = 'auto';

	let focus: boolean = false;
	$: nonEmpty = focus || !!value;
</script>

<label style={`width: ${width};`} aria-selected={focus} non-empty={nonEmpty}>
	<p class="label">{label}</p>
	<input
		type="datetime-local"
		bind:value
		{required}
		{maxlength}
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>
</label>

<style lang="scss">
	@import '../_variables';
	@import '../global.scss';

	label {
		@extend %input;
	}
</style>
