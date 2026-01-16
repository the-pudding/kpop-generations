<script>
	let { id, images } = $props();
</script>

<div class="images-container">
	{#each images as { src, alt, shape, style }}
		<div class="image-wrapper" {style}>
			<img
				class:rectangle={shape === "rectangle"}
				class:oval={shape === "oval"}
				src={`assets/${id}/${src}`}
				{alt}
			/>
		</div>
	{/each}
</div>

<style>
	.images-container {
		grid-column: 2;
		display: flex;
		margin: 3rem 0;
		justify-content: center;
	}

	img {
		border: 2px solid black;
	}

	img.rectangle {
		border-radius: var(--border-radius);
	}

	img.oval {
		border-radius: 1000px;
	}
</style>
