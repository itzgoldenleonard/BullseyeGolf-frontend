<script lang="ts">
	// Stores
	import { page } from '$app/stores';
	// SMUI Components
	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';
	import Button, { Label } from '@smui/button';
	// Functions
	import { createEventDispatcher } from 'svelte';
	import { displayScore } from '$lib/displayScore';

	// UI Variables
	export let open: boolean = false; // Open state of the dialog itself

	let [member_no, name, scoreM, scoreCm] = ['', '', null, null];
	let confirmed = false;

	const dispatch = createEventDispatcher();
	function submit() {
        name = member_no ? `${member_no} ${name}` : name;
		dispatch('submit', { name, scoreM, scoreCm });
		[member_no, name, scoreM, scoreCm] = ['', '', null, null];
		confirmed = false;
	}
</script>

<Dialog bind:open fullscreen>
	<Header>
		<Title>Ny notering</Title>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>

	<Content>
		<form on:submit|preventDefault={submit}>
			<span>Navn</span>
			<Textfield
				variant="outlined"
				bind:value={name}
				required
				input$maxlength={40}
				input$minlength={2}
				style="width: 100%;"
			>
			</Textfield>

			<span>Medlemsnummer</span>
			<Textfield
				variant="outlined"
				bind:value={member_no}
				input$maxlength={11}
				input$minlength={2}
                input$pattern={'\\d*[- ]?\\d*'}
				style="width: 100%;"
			>
				<HelperText slot="helper">Ikke påkrævet</HelperText>
			</Textfield>

			<span>Distance</span>
			<div class="distance-grid">
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
				<Checkbox bind:checked={confirmed} />
				<span slot="label"
					>Bekræft at <b>'{member_no ? `${member_no} ${name}` : name}'</b> er
					<b>{displayScore(scoreM + Math.min(scoreCm, 99) * 0.01)}m</b>
					fra
					<b>hul {$page.params.holeNumber}</b></span
				>
			</FormField>

			<input type="submit" id="submit-button" hidden />
			<!--- This is the actual submit button with functionality, the visible button just clicks this one -->
		</form>
	</Content>

	<Actions>
		<Button
			on:click={() => {
				document.getElementById('submit-button').click();
			}}
			action=""
			disabled={!confirmed}><Label>Indsend</Label></Button
		>
	</Actions>
</Dialog>

<style lang="scss">
	@use '@material/textfield/index' as mdc-textfield;

	.distance-grid {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: mdc-textfield.$padding-horizontal;
		margin-bottom: mdc-textfield.$padding-horizontal;
	}
</style>
