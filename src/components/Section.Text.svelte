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

		border: var(--border);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		margin: 3rem 0;
		padding: 2rem;
		width: calc(100% - var(--speaker-overhang));
		max-width: 666px;
		position: relative;
	}

	.text-block.left {
		align-self: start;
		margin-left: var(--speaker-overhang);
		color: var(--eunice-text-color);
		background: var(--eunice-text-bg);
	}

	.text-block.right {
		align-self: end;
		margin-right: var(--speaker-overhang);
		color: var(--minji-text-color);
		background: var(--minji-text-bg);
	}

	.speaker {
		border: var(--border);
		box-shadow: var(--box-shadow);
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
		background: var(--eunice-text-bg);
	}

	.right .speaker {
		left: auto;
		right: 0;
		transform: translate(var(--speaker-overhang), -50%);
		background: var(--minji-text-bg);
	}
</style>
