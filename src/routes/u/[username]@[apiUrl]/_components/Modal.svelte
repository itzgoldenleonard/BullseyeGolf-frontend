<script lang="ts">
	export let open: boolean;
</script>

{#if open}
	<div class="modal-bg" on:click|stopPropagation={() => (open = false)}>
		<section on:click|stopPropagation>
			<slot />
		</section>
	</div>
{/if}

<style lang="scss">
	@import '../../../../../static/_variables';
	@import '../../../../../static/global.scss';

	.modal-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;

		section {
			@extend %card;
			max-width: 90%;
			max-height: 80%;
		}
	}
</style>
