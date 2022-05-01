<script lang="ts">
    import { page } from '$app/stores';
    import SvgIcon from '@jamescoyle/svelte-icon';
    import { mdiArrowLeft, mdiInformationOutline } from '@mdi/js';
    import Modal from './_components/modal.svelte';

    let infoOpen: boolean = false;
</script>

<header>
    {#if $page.params.dbId !== undefined}
        <a href="./">
            <SvgIcon type="mdi" path={mdiArrowLeft} size="48"></SvgIcon>
        </a>
    {/if}
    <img src="/logo-temp.svg" alt="logo">
    <button on:click={() => infoOpen = true}>
        <SvgIcon type="mdi" path={mdiInformationOutline} size="48"></SvgIcon>
    </button>
</header>

<body>
    <Modal bind:open={infoOpen}>
        <h1>
            infofelt
        </h1>    
    </Modal>
    <slot></slot>
</body>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

	body {
		@extend %body;
		width: auto;
		padding: $padding;
        overflow: hidden;
    }

    header {
        position: absolute;
        top: 0;
        left: 0;
        height: 48px;
        width: 100%;
        background-color: $foreground-color; 
        opacity: 0.9;
        z-index: 1;
        color: $text-color;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 100%;
        }

        a {
            color: $text-color;
            position: absolute;
            left: 0;
            top: 0;
        }

        button {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

</style>