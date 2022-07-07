<script lang="ts">
    export let src: string = "";
    export let title: string = "Nærmest hullet";
    export let sponsor: string = "";
</script>

<div class="hero-container">
    <aside>
        <img
            src={src ? src : '/default-header/medium.webp'}
            alt="Turneringens billede"
        />
        <div>
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
	@import '../../../../../static/_variables';

    .hero-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        @media only screen and (orientation: landscape) {
            flex-direction: row;
        }

        aside {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            aspect-ratio: 3/2;
            @media only screen and (orientation: landscape) {
                width: 50%;
            }

            img,
            div {
                position: absolute;
                width: 100%;
                object-fit: cover;
                height: 100%;
            }

            div {
                background: linear-gradient(180deg, hsla(0, 0%, 0%, 0) 0%, 10%, hsla(0, 0%, 0%, 0.712));
                display: grid;
                height: auto;
                bottom: 0;
                grid-template-rows: 1fr auto;
                align-items: center;
                padding-inline: $padding-large;
                box-sizing: border-box;
            }
        }

        h1 {
            @include typography.typography('headline4');
            margin-bottom: 0;
        }
        p {
            @include typography.typography('subtitle1');
        }

        main {
            padding: 10px;
            // max-height: will be passed on to the scorelist;
            @media only screen and (orientation: landscape) {
                width: 50%;
            }
        }
    }
</style>
