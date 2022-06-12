<script lang="ts">
    export let src: string = "";
    export let title: string = "Nærmest hullet";
    export let sponsor: string = "";
    export let number: number = 0;
</script>

<aside>
    <img
        src={src ? src : '/default-header/medium.webp'}
        alt="Turneringens billede"
    />
    <div>
        <h1>
            {title ? title : 'Nærmest hullet'}
            <br />
            Hul {number}
        </h1>
        {#if sponsor}
            <p>
                Sponsoreret af: {sponsor}
            </p>
        {/if}
    </div>
</aside>
<main>
    <slot />
</main>

<style lang="scss">
	@import '../../../../../static/_variables';

    aside {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        aspect-ratio: 3/2;
        @media only screen and (orientation: landscape) {
            aspect-ratio: 5/1;
        }

        img,
        div {
            position: absolute;
            width: 100%;
            object-fit: cover;
            height: 100%;
        }

        div {
            background: linear-gradient(-110deg, hsla(0, 0%, 0%, 0) 35%, 40%, hsla(0, 0%, 0%, 0.712));
            display: grid;
            grid-template-rows: 1fr auto;
            align-items: center;

            h1 {
                margin: 0;
                margin-left: $padding-large;
                max-width: 60%;
                font-size: $h1-size;
                font-weight: 600;
            }
            p {
                margin: $padding;
                max-width: 80%;
            }
        }
    }

    main {
        padding: 10px;
        max-height: 100%;
    }
</style>
