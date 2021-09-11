<script lang="ts">
    export let database;

    import { show_submit_screen } from './stores';

    function handle_click() {
        show_submit_screen.set(true);
    }
</script>


<div class="image-container">
    {#if database.img == 'None'}
    <picture>
        <source type="image/avif" srcset="/default-header/large.avif" />
        <source type="image/webp" srcset="/default-header/large.webp" />
        <img src="/default-header/large.jpg" srcset="/default-header/large.png" alt="" class="header-image"/>
    </picture>
    
    {:else}
    
    <img src={database.img} alt="" class="header-image">
    {/if}

    <div class="image-shade">
        <h1 class="main-heading">
            Nærmest hullet <br/> Hul {database.hole}
        </h1>
    </div>
</div>

<div class="header">
    <img class="logo" src="/logo-temp.svg" alt="">
    <svg class="info-button" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </svg>
</div>


<div class="scores-grid">
    {#if database.scores.length == 0}
        <h2 class="no-scores-title">
            Der er ingen noteringer endnu
        </h2>
        <h2 class="no-scores-title">
            Vær den første til indsende en
        </h2>
    {/if}

    {#if database.scores.length >= 1}
    <div class="individual-score 1-place">
        <p>
            1.
        </p>
        <p>
            {database.scores[0]['name']}
        </p>
        <p>
            {database.scores[0]['score']}
        </p>
    </div>
    {/if}

    {#if database.scores.length >= 2}
    <div class="individual-score 2-place">
        <p>
            2.
        </p>
        <p>
            {database.scores[1]['name']}
        </p>
        <p>
            {database.scores[1]['score']}
        </p>
    </div>
    {/if}

    {#if database.scores.length >= 3}
    <div class="individual-score 3-place">
        <p>
            3.
        </p>
        <p>
            {database.scores[2]['name']}
        </p>
        <p>
            {database.scores[2]['score']}
        </p>
    </div>
    {/if}

    {#if database.scores.length >= 4}
    <div class="individual-score 4-place">
        <p>
            4.
        </p>
        <p>
            {database.scores[3]['name']}
        </p>
        <p>
            {database.scores[3]['score']}
        </p>
    </div>
    {/if}

    {#if database.scores.length >= 5}
    <div class="individual-score 4-place">
        <p>
            5.
        </p>
        <p>
            {database.scores[4]['name']}
        </p>
        <p>
            {database.scores[4]['score']}
        </p>
    </div>
    {/if}
</div>

<button class="submit-button individual-score" on:click={handle_click}>
    Indsend notering
</button>


<style>
    .submit-button {
        position: fixed;
        bottom: 0;
    }

    .scores-grid {
        display: grid;
        gap: 1rem;
        grid-template-rows: repeat(5, 1fr);
        position: absolute;
        top: 30vh;
    }

    .info-button {
        height: 80%;
        color: #d3dae3;
        position: absolute;
        right: 0.1rem;
    }

    .logo {
        height: 100%;
    }

    .header {
        height: 2rem;
        background-color: #404552;
        opacity: 0.95;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        align-items: center;
    }

    .header-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-container {
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        height: 30vh;
    }
    
    .image-shade {
        background-image: linear-gradient(-75deg, #00000000 35%, 40%, rgba(0, 0, 0, 0.712));
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30vh;
        display: flex;
        align-items: center;
    }

    .main-heading {
        color: #d3dae3;
        margin-left: 1rem;
    }
</style>