<script lang="ts">
	import { page } from '$app/stores';
    export var hole: number;
    export var db_id: string;
</script>

<a href="./{$page.params.api_url}/{db_id}">
    <div class="hole-card-body">
        <p>
            Hul <br/>
            {hole}
        </p>
    </div>
</a>