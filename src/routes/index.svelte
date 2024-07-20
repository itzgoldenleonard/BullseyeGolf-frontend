<script lang="ts">
	// SMUI Components
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import Button, { Label } from '@smui/button';
	import Paper, { Content } from '@smui/paper';
	// Custom components
	import Video from './_components/Video.svelte';
</script>

<TopAppBar dense>
	<Row>
		<Section align="end">
			<Button href="/admin-manual.pdf">
				<Label style="text-transform: none;">Manual</Label>
			</Button>
		</Section>
	</Row>
</TopAppBar>

<main>
	<h1>Bullseyegolf: <br /> Nærmest hullet til det 21. århundrede</h1>

	<h2>Sådan gør du</h2>
	<ol class="tutorial">
		<li>
			<p>1. Opret turnering</p>
			<img src="/index-images/step1.webp" alt="1. Opret turnering" />
		</li>
		<li>
			<p>2. Opret huller</p>
			<img src="/index-images/step2.webp" alt="2. Opret huller" />
		</li>
		<li>
			<p>3. Spillere skriver sig på</p>
			<img src="/index-images/step3.webp" alt="3. Spillere skriver sig på" />
		</li>
	</ol>

	<h2>Nemt at adminstrere</h2>
	<section class="showcase">
		<img src="/index-images/admin.webp" alt="Nemt at adminstrere" />
		<p>
			Når du køber Bullseyegolf får du et personligt link til dit adminstratormodul. Her kan du
			oprette, slette, kopiere og printe dine turneringer. Du kan selv vælge hvilke huller der er
			med i turneringen, samt et navn, en sponsor og et billede til hver turnering og til hvert hul.
		</p>
	</section>

	<h2>Nemt at spille med</h2>
	<section class="showcase right-aligned">
		<p>
			Alt man skal bruge for at være med i turneringen er en mobil der kan scanne en qr kode og gå
			ind på hjemmesiden. ...
		</p>
		<img src="/index-images/user.webp" alt="Nemt at spille med" />
	</section>

	<h2>Fordelene ved Bullseyegolf</h2>
	<ol>
		<li>Du behøver aldrig mere at hente eller sætte papirer ud.</li>
		<li>Programmet er kompatibelt med alt der har en web browser</li>
		<li>Tilgængeligt, hurtigt, intuitivt og høj kvalitets program</li>
                <li>Ingen reklamer, tracking eller dataopsamling</li>
		<li>Frit og open source</li>
	</ol>

	<h2>Kom i gang</h2>
	<p>
		Du kan selv hoste din egen bullseyegolf API server gratis. Det er lidt teknisk, men hvis du er god med computere
                kan det sagtens lade sig gøre. Du kan læse hvordan i bullseyegolf server wikien:
	</p>
	<p><a href="https://github.com/itzgoldenleonard/BullseyeGolf-server/wiki/Setting-up-a-production-server">Sådan sætter man en bullseyegolf API server op</a></p>
        <p>
                Du kan også selv hoste denne web app, hvis du har lyst til at lave modifikationer. Hvis du ikke vil lave modifikationer kan du
                bare bruge appen på denne her side. Det er gratis at hoste web appen med cloudflare pages, ligesom denne side.
        </p>
        <p><a href="https://github.com/itzgoldenleonard/BullseyeGolf-frontend/wiki">Læs mere om denne frontend app til bullseyegolf</a></p>
</main>

<Paper>
	<Content>
		<footer>
			<div class="footer-element">
				<b> Gizel Production & Design </b>
				<p>2022 © Gizel Production & Design, Nogle rettigheder reserveret <br /> CVR: 40714170</p>
			</div>
		</footer>
	</Content>
</Paper>

<style lang="scss">
	@use '@material/typography/index' as typography;

	// This is for the desktop only styles
	@media only screen and (min-width: 480px) {
		.tutorial.tutorial,
		footer:not(x) {
			flex-direction: row;
		}
		.showcase.showcase {
			grid-template-columns: 1.4fr 2fr;
		}
		.footer-element.footer-element {
			max-width: 50%;
		}
	}

	.tutorial {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;

		li {
			display: flex;
			flex-direction: column;
			align-items: center;

			img {
				width: 100%;
			}
		}
	}

	.showcase {
		display: grid;
		max-width: 1400px;
		gap: 1rem;

		* {
			width: 100%;
		}
	}

	.right-aligned {
		margin-left: auto;
	}

	.about-video {
		width: 100%;
		max-width: 1400px;
		aspect-ratio: 19/9;
	}

	footer {
		display: flex;
		gap: 1rem;
		flex-direction: column;

		.footer-element {
			display: flex;
			flex-direction: column;
			max-width: 100%;
		}
	}

	main {
		padding-inline: 10px;
	}

	h1 {
		@include typography.typography('headline2');
		padding-block: 4em;
		margin: 0;
		//background-image: url("/default-header/large.webp");
	}

	h2 {
		@include typography.typography('headline4');
	}

	p,
	a {
		@include typography.typography('body1');
	}

	a {
		text-decoration: underline;
	}
</style>
