<script lang="ts">
    // Stores
	import { VERSION, REPOURL } from '$lib/stores';
    // SMUI Components
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label, Icon } from '@smui/button';

    // UI Variables
	export let open: boolean;
</script>

<Dialog bind:open>
	<Title>Du bruger Bullseyegolf version: {$VERSION}</Title>
    <Content>
        <p>
            Programmet er stadig under udvikling, så hvis du opdager nogle problemer eller har ideer til
            nye funktioner ville det blive værdsat hvis du laver en 'issue' på denne bug tracker
        </p>
        <Button color="secondary" href={`${$REPOURL}/BullseyeGolf-frontend/issues`} target="_blank">
            <Icon class="material-icons">bug_report</Icon>
            <Label>Bug tracker</Label>
        </Button>
        <p>
            BullseyeGolf er fri software og bruger AGPL-v3 licensen. Du kan se kildekoden her:
        </p>
        <Button color="secondary" href={`${$REPOURL}/BullseyeGolf-frontend`} target="_blank">
            <Icon class="material-icons">source</Icon>
            <Label>Kildekode til frontend</Label>
        </Button>
        <Button color="secondary" href={`${$REPOURL}/BullseyeGolf-server`} target="_blank">
            <Icon class="material-icons">source</Icon>
            <Label>Kildekode til backend</Label>
        </Button>
    </Content>
	<Actions>
		<Button>
			<Label>OK</Label>
		</Button>
	</Actions>
</Dialog>

