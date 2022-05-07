<script lang="ts">
	// This is an exact copy of InputText.svelte (exept for the input type and this comment), to make changes, do it in InputText.svelte and copy them to here.
	export let value: number;
	export let label: string = '';
	export let required: boolean = false;
	export let max: number = 100;
	export let min: number = 0;
	export let step: number = 1;
	export let width: string = 'auto';
	export let unit: string = '';

	let focus: boolean = false;
	$: nonEmpty = focus || value !== null; // This needs to be changed for the number too, because 0 is falsy
</script>

<label style={`width: ${width};`} aria-selected={focus} non-empty={nonEmpty}>
	<p class="label">{label}</p>
	<input
		type="number"
		bind:value
		{required}
		{max}
		{min}
		{step}
		on:focus={() => (focus = true)}
		on:blur={() => (focus = false)}
	/>
	<p class="unit">{unit}</p>
</label>

<style lang="scss">
	@import '../_variables';
	@import '../global.scss';

	label {
		@extend %input;
	}
</style>
