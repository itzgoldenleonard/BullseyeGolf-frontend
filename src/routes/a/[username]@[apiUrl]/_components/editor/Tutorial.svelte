<main>
	<p>
		Kom i gang ved at vælge en turnering i navigationsbaren i venstre side, eller opret en ny
		turnering med '+' knappen
	</p>
</main>

<style lang="scss">
	@import '../../../../../../static/_variables';
	@import '../../../../../../static/global.scss';

	main {
		@extend %card;
		grid-area: content;
		margin: $gap;
		position: relative;
		overflow-y: auto;

		@media only print {
			display: none;
		}
	}
</style>
