<script lang="ts">
	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import { createEventDispatcher } from 'svelte';
    import { displayScore } from '$lib/displayScore';
	import { page } from '$app/stores';

	export let open: boolean = false;

    let [name, scoreM, scoreCm] = ['', null, null];
    let checked = false;

	const dispatch = createEventDispatcher();
	function submit() {
		dispatch('submit', { name, scoreM, scoreCm });
        [name, scoreM, scoreCm] = ['', null, null];
        checked = false;
	}
</script>

<Dialog bind:open fullscreen>
	<Header>
		<Title>Ny notering</Title>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>

	<Content>
		<form on:submit|preventDefault={submit}>
			Navn
			<Textfield
				variant="outlined"
				bind:value={name}
				required
				input$maxlength={40}
				input$minlength={2}
				style="width: 100%;"
			>
				<HelperText slot="helper">evt. medlemsnummer</HelperText>
			</Textfield>

			Distance
			<div>
				<Textfield
					bind:value={scoreM}
					variant="outlined"
					type="number"
					suffix="m"
					input$min={0}
					input$max={25}
					input$step={1}
					style="width: 100%;"
				/>
				<Textfield
					bind:value={scoreCm}
					variant="outlined"
					type="number"
					required
					suffix="cm"
					input$min={0}
					input$max={99}
					input$step={1}
					style="width: 100%;"
				/>
			</div>
            <FormField>
                <Checkbox bind:checked />
                <span slot="label">Bekræft at <b>'{name}'</b> er <b>{displayScore(scoreM+scoreCm*0.01)}m</b> fra <b>hul {$page.params.holeNumber}</b></span>
            </FormField>

			<input type="submit" id="submit-button" hidden />
		</form>
	</Content>

	<Actions>
		<Button
			on:click={() => {
				document.getElementById('submit-button').click();
			}}
			action="" disabled={!checked}><Label>Indsend</Label></Button
		>
	</Actions>
</Dialog>

<style lang="scss">
	@use '@material/textfield/index' as mdc-textfield;

	div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: mdc-textfield.$padding-horizontal;
        margin-bottom: mdc-textfield.$padding-horizontal;
	}
</style>
