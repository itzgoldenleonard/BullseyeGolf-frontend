<script lang="ts">
	import List, { Item, Text, Separator, Subheader, Meta, Graphic } from '@smui/list';
    import { createEventDispatcher } from 'svelte';
	import Dialog, { Title, Content } from '@smui/dialog';

	export let tournament: ShortTournament;
	export let active: string;

	let open = false;

	const dispatch = createEventDispatcher();

	function pick(tournamentId: string) {
		dispatch('pick', { tournamentId });
	}

	function print(tournamentId: string) {
		dispatch('print', { tournamentId });
        open = false;
	}

	function duplicate(tournamentId: string) {
		dispatch('duplicate', { tournamentId });
        open = false;
	}

	function remove(tournamentId: string) {
		dispatch('remove', { tournamentId });
        open = false;
	}
</script>

<Item
	on:click={() => pick(tournament.tournament_id)}
	activated={active === tournament.tournament_id}
>
	<Text>{tournament.tournament_name}</Text>
	<Meta class="material-icons" on:click$stopPropagation={() => (open = true)}>more_vert</Meta>
</Item>

<Dialog bind:open selection>
    <Title>{tournament.tournament_name}</Title>
    <Content>
        <List>
            <Item on:SMUI:action={() => print(tournament.tournament_id)}>
                <Graphic class="material-icons">print</Graphic>
                <Text>Print</Text>
            </Item>
            <Item on:SMUI:action={() => duplicate(tournament.tournament_id)}>
                <Graphic class="material-icons">content_copy</Graphic>
                <Text>Dupliker</Text>
            </Item>
            <Separator />
            <Item on:SMUI:action={() => remove(tournament.tournament_id)}>
                <Graphic class="material-icons" style="color: red;">delete</Graphic>
                <Text class="error-text" style="color: red; //tmp">Slet</Text>
            </Item>
        </List>
    </Content>
</Dialog>
