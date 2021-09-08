<script lang="ts">
    export let database;
</script>


<div class="header">
    <img class="logo" src="/logo-temp.svg" alt="">
    <svg class="info-button" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </svg>
</div>

<div class="image-container">
    <div class="image-shade">
        <h1 class="main-heading">
            Nærmest hullet
        </h1>
        <h1 class="hole-heading">
            Hul {database.hole}
        </h1>
    </div>
    <img src={database.img == 'None' ? "/default-header-large.jpg" : database.img} alt="" class="header-image">
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

<button class="submit-button individual-score">
    Indsend notering
</button>


<style>
    .info-button {
        height: 80%;
    }

    .logo {
        height: 100%;
    }

    .header {
        height: 40px;
        background-color: #404552;
    }

    .header-image {
        width: 100%;
    }
</style>