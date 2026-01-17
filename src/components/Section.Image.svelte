<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, src, alt, shape } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;
</script>

<div class="image-wrapper">
	<img
		bind:this={el}
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
		border: 2px solid black;
		border-radius: var(--border-radius);
	}
</style>
