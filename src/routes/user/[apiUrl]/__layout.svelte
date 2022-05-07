<script lang="ts">
    import { page } from '$app/stores';
    import { mdiArrowLeft, mdiInformationOutline, mdiGithub } from '@mdi/js';
    import { VERSION, REPOURL } from '../../../../static/persistence/stores';
    import SvgIcon from '@jamescoyle/svelte-icon';
    import Modal from './_components/Modal.svelte';

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

<div id="body">
    <Modal bind:open={infoOpen}>
        <h1>
            Du bruger BullseyeGolf version: {$VERSION}
        </h1>    
        <p>
			Programmet er stadig under udvikling, så hvis du opdager nogle problemer eller har ideer til
			nye funktioner ville det blive værdsat hvis du laver en 'issue' på denne bug tracker
        </p>
        <a href={`${$REPOURL}/BullseyeGolf-frontend/issues`} target="_blank">
            <div>
                <SvgIcon type="mdi" path={mdiGithub}/>
                <p>Bug tracker</p>
            </div>
        </a>
		<p>
            BullseyeGolf er fri/gratis software og bruger AGPL-v3 licensen. Du kan se kildekoden her:
        </p>
        <a href={`${$REPOURL}/BullseyeGolf-frontend`} target="_blank">
            <div>
                <SvgIcon type="mdi" path={mdiGithub}/>
                <p>Kildekode til frontend</p>
            </div>
        </a>
        <a href={`${$REPOURL}/BullseyeGolf-backend`} target="_blank">
            <div>
                <SvgIcon type="mdi" path={mdiGithub}/>
                <p>Kildekode til backend</p>
            </div>
        </a>
    </Modal>
    <slot></slot>
</div>

<style lang="scss">
	@import '../../../../static/_variables';
	@import '../../../../static/global.scss';

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

        a {
            position: absolute;
            left: 0;
            top: 0;
        }

        img {
            height: 100%;
        }

        button {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

	#body {
		@extend %body;
		width: auto;
		padding: $padding;
        overflow: hidden;

        a { // Modal "button" links
            color: $text-color;
            text-decoration: none;
            
            div {
                @include button();
                margin: $padding 0;
                padding-left: $padding-small;
                display: flex;
                align-items: center;
                width: auto;

                
                > * {
                    margin-left: $padding-small;
                }
            }
        }
    }


</style>