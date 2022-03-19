<script lang="ts">
	import { activeTournament, formChanged } from '../../persistence/stores';
	import { postTournament } from '../../scripts/api';
	import TimePicker from './TimePicker.svelte';
	import ImagePicker from '../../../../../../static/components/ImagePicker.svelte';
	import Hole from './Hole.svelte';
	import InputText from '../../../../../../static/components/InputText.svelte';
	import { deleteActiveTournament, generateID, updateTournamentList } from '../../scripts/misc';

	export let baseUserUrl: string;
	export let baseAdminUrl: string;

	function duplciateActiveTournament(): void {
		$activeTournament.db_id = generateID();
		$activeTournament.tournament_name += ' (kopi)';
		submit();
	}

	async function submit(): Promise<void> {
		await postTournament(baseAdminUrl, $activeTournament);
		updateTournamentList(baseUserUrl);
		formChanged.set(false);
	}
</script>

<main>
<form on:submit|preventDefault={submit} on:change={() => formChanged.set(true)}>
	<article id="tournament">
		<h2>Turnering</h2>

		<InputText
			label="Turneringens navn"
			bind:value={$activeTournament.tournament_name}
			required
			maxlength={40}
			width="100%"
		/>

		<InputText
			label="Sponsor"
			bind:value={$activeTournament.tournament_sponsor}
			maxlength={40}
			width="100%"
		/>

		<TimePicker />

		<figure>
			<ImagePicker bind:value={$activeTournament.tournament_image} alt="Turneringens billede" />
		</figure>
	</article>

	<article id="holes">
		<h2>Huller</h2>

		<ol>
			{#each $activeTournament.holes as hole}
				<Hole bind:hole />
			{/each}
		</ol>

		<div id="buttons">
			<button id="duplicate" on:click|preventDefault={duplciateActiveTournament}>
				Dupliker turnering
			</button>
			<button
				id="delete"
				on:click|preventDefault={() => deleteActiveTournament(baseAdminUrl, baseUserUrl)}
			>
				Slet turnering
			</button>
			<input type="submit" value="Anvend" />
		</div>
	</article>
</form>
</main>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	main {
		grid-area: content;
		margin: $gap;
		position: relative;

		form {
			display: grid;
			grid-template-columns: minmax(400px, 1fr) minmax(400px, 1fr);
			column-gap: $padding;
			grid-template-areas: 'tournament holes';
			overflow-y: hidden;
			height: 100%;
			width: 100%;

			article {
				@extend %card;
				display: grid;

				h2 {
					font-size: $h2-size;
					margin: 0;
					padding-top: $padding;
				}

				&#tournament {
					grid-area: tournament;
					overflow: hidden;
					grid-template-columns: 1fr;
					grid-template-rows: repeat(4, auto) 1fr;
					row-gap: $padding-large;

					figure {
						position: relative;
						margin: 0;
					}
				}

				&#holes {
					grid-area: holes;
					overflow-y: auto;
					grid-template-rows: auto 1fr auto;

					ol {
						margin: 0;
						padding: 0;
					}

					div {
						display: flex;
						justify-content: end;
						gap: $padding;

						> * {
							font-size: $h3-size;
							padding-left: $padding-large;
							padding-right: $padding-large;

							&#duplicate {
								@include button();
								@extend %selectable;
							}

							&#delete {
								@extend %button-negative;
							}

							&[type='submit'] {
								@extend %button-hilighted;
							}
						}
					}
				}
			}
		}
	}
</style>
