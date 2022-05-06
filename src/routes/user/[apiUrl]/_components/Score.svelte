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
            background: linear-gradient(137deg, #f1d44f 0%, 50%, #c79500);
        }

        &.score-2 {
            background: linear-gradient(142deg, #d0d2d8 0%, 50%, #9598a1);
        }

        &.score-3 {
            background: linear-gradient(150deg, #df9c6b 0%, 40%, #a24b20);
        }
        
        p {
            text-shadow: $shadow-text;
            font-size: $text-size;
        }
        
        :nth-child(1) {
            font-size: $text-size * 1.5;
        }
    }
</style>