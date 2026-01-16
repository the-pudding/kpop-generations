<script>
	let { src, alt, shape } = $props();
</script>

<div class="image-wrapper">
	<img {src} {alt} />
</div>

<style>
	.image-wrapper {
		grid-column: 2;
		margin: 3rem 0;
	}

	img {
		border: 2px solid black;
		border-radius: var(--border-radius);
	}
</style>
