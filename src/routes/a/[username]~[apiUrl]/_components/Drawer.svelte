<script lang="ts">
	// SMUI Components
	import Drawer, { Header, Title, Content, Scrim, AppContent } from '@smui/drawer';
	import List, { Subheader, Separator } from '@smui/list';
	import { H6 } from '@smui/common/elements';
	import Button, { Label, Icon } from '@smui/button';
	// Custom Components
	import DrawerItem from './DrawerItem.svelte';
	// Functions
	import { createEventDispatcher } from 'svelte';

	// UI Variables
	export let open: boolean;
	export let active = '';
	export let modal = false;

	// Variables
	export let tournamentList: Promise<ShortTournament[]>;

	// Functions
	const dispatch = createEventDispatcher();
	function createTournament() {
		dispatch('createTournament');
	}
	function forwardDuplicate(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('duplicate', e.detail);
	}
	function forwardPick(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('pick', e.detail);
		if (modal) open = false;
	}
	function forwardDelete(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('delete', e.detail);
	}
	function forwardPrint(e: CustomEvent<{ tournamentId: string }>) {
		dispatch('print', e.detail);
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

{#if modal} <Scrim /> {/if}
<AppContent style="height: 100%;">
	<slot />
</AppContent>
