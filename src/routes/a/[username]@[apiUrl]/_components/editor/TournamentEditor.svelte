<script lang="ts">
	import { activeTournament, formChanged, selectedTournament } from '../../persistence/stores';
	import { postTournament } from '../../scripts/api';
	import TimePicker from './TimePicker.svelte';
	import ImagePicker from '../../../../../../static/components/ImagePicker.svelte';
	import Hole from './Hole.svelte';
	import InputText from '../../../../../../static/components/InputText.svelte';
	import { deleteActiveTournament, generateID, updateTournamentList } from '../../scripts/misc';
    import { page } from '$app/stores';

	export let baseUrl: string;
    let saveText: string = 'Gem';

	function duplciateActiveTournament(): void {
        if ($formChanged && !confirm('Er du sikker på at du vil ændre turnering?\nDine ugemte ændringer vil blive slettet')) return
        formChanged.set(true)
		$activeTournament.tournament_id = generateID();
		selectedTournament.set($activeTournament.tournament_id);
		$activeTournament.tournament_name += ' (kopi)';
	}

	async function submit(): Promise<void> {
        if ($activeTournament.t_end < $activeTournament.t_start) return alert('Slut tidspunktet må ikke være før start tidspunktet')
        saveText = '...';
        try {
		await postTournament(baseUrl, $activeTournament, $page.query.get('apiKey'));
        } catch (e) {
            saveText = '❌';
            await new Promise(r => setTimeout(r, 1500));
            saveText = 'Gem';
            return
        }
        saveText = '✓';
		updateTournamentList(baseUrl);
		formChanged.set(false);
        await new Promise(r => setTimeout(r, 1500));
        saveText = 'Gem';
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
				<button id="print" on:click|preventDefault={() => window.print()}>
					Print resultatliste
				</button>
				<button id="duplicate" on:click|preventDefault={duplciateActiveTournament}>
					Dupliker turnering
				</button>
				<button
					id="delete"
					on:click|preventDefault={() =>
						confirm('Er du sikker på at du vil slette turneringen? Du kan ikke fortryde!')
							? deleteActiveTournament(baseUrl, $page.query.get('apiKey'))
							: null}
				>
					Slet turnering
				</button>
                <input type="submit" value={saveText}>
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
		overflow-y: auto;

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

				&#tournament {
					grid-area: tournament;
					overflow: hidden;
					grid-template-columns: 1fr;
					grid-template-rows: repeat(4, auto) 1fr;
					row-gap: $padding-large;
				}

				&#holes {
					grid-area: holes;
					overflow-y: hidden;
					grid-template-rows: auto 1fr auto;

					ol {
						margin: 0;
						padding: 0;
						overflow-y: auto;
					}

					div {
						display: flex;
						justify-content: end;
						padding-top: $padding;
						gap: $padding;

						> * {
							padding-left: $padding-large;
							padding-right: $padding-large;

							&#duplicate,
							&#print {
								@include button();
								@extend %selectable;
							}

							&#delete {
								@extend %button-negative;
							}

							&[type='submit'] {
								@extend %button-hilighted;
								font-size: $h3-size;
                                width: 45px + $padding-large * 2;
							}
						}
					}
				}
			}
		}
		@media only print {
			display: none;
		}
	}
</style>
