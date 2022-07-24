<script lang="ts">
	import Drawer, { AppContent, Content, Header, Title, Scrim } from '@smui/drawer';
	import List, { Item, Text, Separator, Subheader, Meta, Graphic } from '@smui/list';
	import { H6 } from '@smui/common/elements';
	import { createEventDispatcher } from 'svelte';
	import Button, { Label, Icon } from '@smui/button';

	import DrawerItem from './DrawerItem.svelte';

	export let open: boolean;
	export let tournamentList: Promise<ShortTournament[]>;

	export let active = '';
	export let modal = false;

	const dispatch = createEventDispatcher();
	function forwardPick(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('pick', e.detail);
		if (modal) open = false;
	}

	function createTournament() {
		dispatch('createTournament');
	}

	function forwardPrint(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('print', e.detail);
	}

	function forwardDuplicate(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('duplicate', e.detail);
	}

	function forwardDelete(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('delete', e.detail);
	}
</script>

<Drawer variant={modal ? 'modal' : 'dismissible'} bind:open>
	<Header>
		<Title>Turneringer</Title>
	</Header>

	<Content>
		<List>
			<Subheader component={H6}>Aktive</Subheader>
			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => e.active) as tournament}
					<DrawerItem
						{tournament}
						{active}
						on:pick={forwardPick}
						on:print={forwardPrint}
						on:duplicate={forwardDuplicate}
						on:delete={forwardDelete}
					/>
				{/each}
			{/await}

			<Separator />
			<Subheader component={H6}>Fremtidige</Subheader>

			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => !e.active && Date.now() < e.t_start * 1000) as tournament}
					<DrawerItem
						{tournament}
						{active}
						on:pick={forwardPick}
						on:print={forwardPrint}
						on:duplicate={forwardDuplicate}
						on:delete={forwardDelete}
					/>
				{/each}
			{/await}

			<Separator />
			<Subheader component={H6}>Afsluttede</Subheader>

			{#await tournamentList then tournamentList}
				{#each tournamentList.filter((e) => !e.active && e.t_end * 1000 < Date.now()) as tournament}
					<DrawerItem
						{tournament}
						{active}
						on:pick={forwardPick}
						on:print={forwardPrint}
						on:duplicate={forwardDuplicate}
						on:delete={forwardDelete}
					/>
				{/each}
			{/await}
		</List>
	</Content>

    <Button on:click={createTournament} touch variant="raised" style="margin-inline: 10px;">
        <Icon class="material-icons">add</Icon>
        <Label>Ny Turnering</Label>
    </Button>
</Drawer>

{#if modal}
	<Scrim />
{/if}
<AppContent style="height: 100%;">
	<slot />
</AppContent>
