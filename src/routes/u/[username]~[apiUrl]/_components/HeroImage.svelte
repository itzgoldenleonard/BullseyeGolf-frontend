<script lang="ts">
	export let src: string = '';
	export let title: string = 'Nærmest hullet';
	export let sponsor: string = '';
</script>

<div class="hero-container">
	<aside>
		<img src={src ? src : '/default-header/medium.webp'} alt="Turneringens billede" />
		<div class="dark-gradient">
			<h1>
				{title ? title : 'Nærmest hullet'}
			</h1>
			<p>
				{#if sponsor}
					Sponsoreret af: {sponsor}
				{/if}
			</p>
		</div>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@use '@material/typography/index' as typography;

	.hero-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		aside {
			position: relative;
			width: 100%;
			aspect-ratio: 3/2;

			img {
				object-fit: cover;
				height: 100%;
			}
			img,
			.dark-gradient {
				position: absolute;
				width: 100%;
			}

			.dark-gradient {
				background: linear-gradient(180deg, hsla(0, 0%, 0%, 0) 0%, 10%, hsla(0, 0%, 0%, 0.712));
				bottom: 0;
				padding-inline: 25px;
				box-sizing: border-box;
			}

			h1 {
				@include typography.typography('headline4');
				margin-bottom: 0;
				color: #fff;
			}
			p {
				@include typography.typography('subtitle1');
				color: #fff;
			}
		}

		main {
			padding: 10px;
			overflow: auto;
			height: 100%;
			box-sizing: border-box;
			// max-height: will be passed on to the scorelist;
		}
	}

	@media only screen and (orientation: landscape) {
		.hero-container.hero-container {
			// Repeat the class name to increase specificity, otherwise the styles wouldnt apply
			flex-direction: row;
			aside,
			main {
				width: 50%;
			}
		}
	}
</style>
