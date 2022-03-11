<script lang="ts">
    export let value: string;
    export let label: string = '';
    export let required: boolean = false;
    export let maxlength: number = 100;
    export let width: string = "auto";

    let focus: boolean = false;
    $: nonEmpty = focus || !!value;
</script>

<label style={`width: ${width};`} aria-selected={focus} non-empty={nonEmpty}>
    <p>{label}</p>
    <input type="text" bind:value {required} {maxlength} on:focus={() => focus = true} on:blur={() => focus = false} />
</label>
    
<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

    label {
        @extend %input;
    }
</style>