<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, sectionId, images } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let els = [];
</script>

<div class="images-container">
	{#each images as { src, alt, shape, style }, i}
		<div class="image-wrapper" {style} bind:this={els[i]}>
			<img
				class:rectangle={shape === "rectangle"}
				class:oval={shape === "oval"}
				src={`assets/${sectionId}/${src}`}
				{alt}
				onload={() => {
					registerNode(`${nodeId}-${i}`, els[i]);
				}}
			/>
		</div>
	{/each}
</div>

<style>
	.images-container {
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
