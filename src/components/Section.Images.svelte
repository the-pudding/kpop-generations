<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, sectionId, images } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let els = [];
</script>

<div id={nodeId} class="images-container">
	{#each images as { src, alt, shape, style }, i}
		<div class="image-wrapper" {style} bind:this={els[i]}>
			<img
				class:rectangle={shape === "rectangle"}
				class:circle={shape === "circle"}
				class:oval={shape === "oval"}
				style:transform={`rotate(${Math.random() * 8 - 4}deg)`}
				src={`assets/img/${sectionId}/${src}`}
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
		margin: 3rem 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		align-items: center;
	}

	img {
		border: 2px solid var(--border);
	}

	.rectangle {
		border-radius: var(--border-radius);
	}

	.circle {
		border-radius: 100%;
	}

	.oval {
		border-radius: 1000px;
	}

	.image-wrapper {
		flex: 1 1 100px;
		max-width: 250px;
	}
</style>
