<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, speaker, text, offset } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<div
	id={nodeId}
	class="text-block"
	class:left={speaker === "eunice"}
	class:right={speaker === "minji"}
	bind:this={el}
>
	<div class="speaker">
		{speaker}
	</div>
	{@html text}
</div>

<style>
	.text-block {
		--speaker-overhang: 1.75rem;

		border: 2px solid black;
		border-radius: var(--border-radius);
		margin: 3rem 0;
		padding: 2rem;
		width: calc(100% - var(--speaker-overhang));
		max-width: 666px;
		position: relative;
	}

	.text-block.left {
		align-self: start;
		margin-left: var(--speaker-overhang);
	}

	.text-block.right {
		align-self: end;
		margin-right: var(--speaker-overhang);
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

	.left .speaker {
		left: 0;
		right: auto;
		transform: translate(calc(-1 * var(--speaker-overhang)), -50%);
	}

	.right .speaker {
		left: auto;
		right: 0;
		transform: translate(var(--speaker-overhang), -50%);
	}
</style>
