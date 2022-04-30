<script lang="ts">
	import { page } from '$app/stores';
	export var name: string;
	export var db_id: string;
</script>

<a href="./{$page.params.api_url}/{db_id}/">
	<div class="tournament-card-body">
		<p>
			{name}
		</p>
	</div>
</a>
