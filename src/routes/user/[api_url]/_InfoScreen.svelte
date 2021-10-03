<script lang="ts">
	import { VERSION_NUMBER, show_info_screen } from './stores';
	import { fade, fly } from 'svelte/transition';

	function close_info() {
		show_info_screen.set(false);
	}
</script>

<div class="modal-bg" on:click={close_info} transition:fade={{ duration: 150 }}>
<div class="modal-container" on:click|stopPropagation in:fly={{ y: 50, duration: 150 }}>
	<h1>Du bruger GolfPin version:</h1>
	<h2>
		{$VERSION_NUMBER}
	</h2>

	<p>
		Programmet er stadig under udvikling, så hvis du opdager nogle problemer eller har ideer 
		til nye funktioner ville det blive værdsat hvis du laver en 'issue' på denne bug tracker
	</p>
	<a href="https://github.com/itzgoldenleonard/GolfPin-frontend/issues" target="_blank">
		<button class="filled-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Bug tracker</p>
		</button></a
	>

	<p>
		GolfPin gratis/libre software og bruger AGPL-v3 licensen. Du kan se kildekoden her:
	</p>
	<a href="https://github.com/itzgoldenleonard/GolfPin-frontend" target="_blank">
		<button class="no-fill-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Frontend source code</p>
		</button>
	</a>
	<a href="https://github.com/itzgoldenleonard/GolfPin-server" target="_blank">
		<button class="no-fill-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Backend source code</p>
		</button>
	</a>
</div>
</div>