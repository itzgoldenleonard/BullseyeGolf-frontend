<script lang="ts">
	import { VERSION_NUMBER } from './stores';
</script>

<div class="info-background">
	<!-- I need a close button here -->

	<h1>You are using GolfPin version:</h1>
	<h2>
		{$VERSION_NUMBER}
	</h2>

	<p>
		It is still early in development, so if you notice any problems or have any feature suggestions
		feel free to leave them here
	</p>
	<a href="https://github.com/itzgoldenleonard/GolfPin-frontend/issues">
		<button class="filled-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Issue tracker</p>
		</button></a
	>

	<p>
		GolfPin is free software licensed under the AGPL version 3. You can view the source code here:
	</p>
	<a href="https://github.com/itzgoldenleonard/GolfPin-frontend">
		<button class="no-fill-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Frontend source code</p>
		</button>
	</a>
	<a href="https://github.com/itzgoldenleonard/GolfPin-server">
		<button class="no-fill-button">
			<img alt="github logo" src="/github-small.svg" />
			<p>Backend source code</p>
		</button>
	</a>
</div>
