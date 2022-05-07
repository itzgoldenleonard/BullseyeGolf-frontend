<script lang="ts">
    export let i: number;
    export let score: number;
    export let name: string;

    $: scoreString = `${Math.floor(score)},${String(Math.floor(score % 1 * 100)).padStart(2, '0')}`;
</script>

<article class={`score-${i}`}>
    <p>{i}.</p>
    <p>{name}</p>
    <p>{scoreString}m</p>
</article>

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

    article {
        @extend %card;
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        gap: $padding;
        align-items: center;

        &.score-1 {
            background: linear-gradient(137deg, hsl(50, 85%, 60%) 0%, 50%, hsl(45, 100%, 33%));
        }

        &.score-2 {
            background: linear-gradient(142deg, hsl(225, 9%, 79%) 0%, 50%, hsl(225, 6%, 50%));
        }

        &.score-3 {
            background: linear-gradient(150deg, hsl(25, 64%, 65%) 0%, 40%, hsl(20, 67%, 38%));
        }
        
        p {
            text-shadow: $shadow-text;
            font-size: $text-size;
        }
        
        :nth-child(1) { // i
            font-size: $text-size * 1.5;
        }
    }
</style>