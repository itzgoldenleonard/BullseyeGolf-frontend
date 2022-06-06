<script lang="ts">
	export let i: number;
	export let score: number;
	export let name: string;
	import { displayScore } from '$lib/displayScore';
	import Card, { Content } from '@smui/card';
</script>

<Card class={`score-${i}`} padded>
	<article>
		<p>{i}.</p>
		<p>{name}</p>
		<p>{displayScore(score)}m</p>
	</article>
</Card>

<style lang="scss">
	@import '../../../../../static/_variables';

	article {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		gap: $padding;
		align-items: center;

		p {
			text-shadow: $shadow-text;
			font-size: 1.25rem;
			margin: 0;
		}

		:nth-child(1) {
			// i
			font-size: 2rem;
		}
	}
	:global(.score-1) {
		background: linear-gradient(137deg, hsl(50, 85%, 60%) 0%, 50%, hsl(45, 100%, 33%));
	}

	:global(.score-2) {
		background: linear-gradient(142deg, hsl(225, 9%, 79%) 0%, 50%, hsl(225, 6%, 50%));
	}

	:global(.score-3) {
		background: linear-gradient(150deg, hsl(25, 64%, 65%) 0%, 40%, hsl(20, 67%, 38%));
	}
</style>
