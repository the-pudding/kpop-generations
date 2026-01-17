<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, speaker, text, offset } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<div class={offset ? `text-block ${offset}` : "text-block"} bind:this={el}>
	<div
		class="speaker"
		class:left={!offset || offset.startsWith("left")}
		class:right={offset && offset.startsWith("right")}
	>
		{speaker}
	</div>
	{@html text}
</div>

<style>
	.text-block {
		border: 2px solid black;
		border-radius: var(--border-radius);
		margin: 3rem auto;
		padding: 2rem;
		max-width: 866px;
		position: relative;
	}

	.left-sm {
		transform: translateX(clamp(calc(-0.5 * var(--margin)), -50px, 0px));
	}

	.left-lg {
		transform: translateX(clamp(calc(-0.8 * var(--margin)), -100px, 0px));
	}

	.right-sm {
		transform: translateX(clamp(calc(0.5 * var(--margin)), 50px, 0px));
	}

	.right-lg {
		transform: translateX(clamp(calc(0.8 * var(--margin)), 100px, 0px));
	}

	.speaker {
		border: 2px solid black;
		background: white;
		text-transform: uppercase;
		font-weight: bold;
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		position: absolute;
		top: 0;
	}

	.speaker.left {
		left: 0;
		right: auto;
		transform: translate(-20%, -50%);
	}

	.speaker.right {
		left: auto;
		right: 0;
		transform: translate(20%, -50%);
	}
</style>
