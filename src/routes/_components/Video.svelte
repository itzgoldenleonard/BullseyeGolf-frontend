<script lang="ts">
	// SMUI Components
	import Button, { Label } from '@smui/button';
	// UI Variables
	let showVideo = false;
	export let url: string;
	export let embedSrc: string;
    export let thumbnail: string;
</script>

<div>
	{#if showVideo}
		<iframe id="odysee-iframe" title="Odysee video" src={embedSrc} allowfullscreen/>
	{:else}
        <img src={thumbnail} alt="Klik for at vise video fra odysee"/>
		<p>Vis video fra odysee.com</p>
		<Button on:click={() => (showVideo = true)} ripple={false}><Label>Vis</Label></Button>
		<a href={url}>{url}</a>
	{/if}
</div>

<style lang="scss">
	@use '@material/typography/index' as typography;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1rem;
        position: relative;
        color: white;

		iframe {
			width: 100%;
			height: 100%;
			border: none;
		}

        img {
            height: 100%;
            width:100%;
            position: absolute;
            z-index: -1;
            filter: brightness(50%) blur(5px);
        }
	}

	p,
	a {
		@include typography.typography('body1');
		margin: 0;
	}

	a {
		text-decoration: underline;
		color: #2f9176;

		&:hover {
			color: #38d9a9;
		}
	}
</style>
