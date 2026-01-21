<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, src, alt, shape } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;
</script>

<div id={nodeId} class="image-wrapper">
	<img
		bind:this={el}
		class:rectangle={shape === "rectangle"}
		class:circle={shape === "circle"}
		class:oval={shape === "oval"}
		{src}
		{alt}
		onload={() => {
			registerNode(nodeId, el);
		}}
	/>
</div>

<style>
	.image-wrapper {
		margin: 3rem 0;
	}

	img {
		margin: 0 auto;
		border: var(--border);
		border-radius: var(--border-radius);
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

	.octogon {
		width: 220px;
		aspect-ratio: 1;
		clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
		overflow: hidden;
	}
</style>
