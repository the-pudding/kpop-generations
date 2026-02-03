<script>
	import Song from "$components/Song.svelte";
	import themes from "$data/themes.json";
	import { getContext, onMount } from "svelte";

	let { sectionId, nodeId, speaker, text, song } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

{#snippet textBlock(withMargin)}
	<div
		id={nodeId}
		class="text-block"
		class:left={speaker === "eunice"}
		class:right={speaker === "minji"}
		class:with-margin={withMargin}
		bind:this={el}
		style={themes[sectionId]["text-style"]}
	>
		<div class="speaker">
			{speaker}
		</div>

		{#if Array.isArray(text)}
			{#each text as { value }}
				<p>{@html value}</p>
			{/each}
		{:else}
			<p>{@html text}</p>
		{/if}
	</div>
{/snippet}

{#if song}
	<div class="text-wrapper">
		{#if song && speaker === "minji"}
			<Song {...song} />
		{/if}

		{@render textBlock(false)}

		{#if song && speaker === "eunice"}
			<Song {...song} />
		{/if}
	</div>
{:else}
	{@render textBlock(true)}
{/if}

<style>
	.text-wrapper {
		display: flex;
		align-items: flex-start;
		margin: 3rem 0;
		justify-content: space-between;
		gap: 1rem;
	}

	.text-block {
		--speaker-overhang: 1.75rem;

		border-radius: var(--border-radius);
		padding: 2rem;
		width: calc(100% - var(--speaker-overhang));
		max-width: 666px;
		position: relative;
	}

	.text-block.with-margin {
		margin: 3rem 0;
	}

	.text-block.left {
		align-self: start;
		margin-left: var(--speaker-overhang);
		color: var(--eunice-text-color, var(--text-color));
		background: var(--eunice-text-bg, var(--text-bg));
		border: 2px solid var(--eunice-border, var(--border));
		outline-color: var(--eunice-border, var(--border));
		box-shadow: var(--eunice-box-shadow, var(--box-shadow));
	}

	.text-block.right {
		align-self: end;
		margin-right: var(--speaker-overhang);
		color: var(--minji-text-color, var(--text-color));
		background: var(--minji-text-bg, var(--text-bg));
		border: 2px solid var(--minji-border, var(--border));
		outline-color: var(--minji-border, var(--border));
		box-shadow: var(--minji-box-shadow, var(--box-shadow));
	}

	.speaker {
		text-transform: uppercase;
		font-weight: bold;
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		position: absolute;
		top: 0;
		backdrop-filter: blur(10px);
	}

	.left .speaker {
		left: 0;
		right: auto;
		transform: translate(calc(-1 * var(--speaker-overhang)), -50%);
		background: var(--eunice-text-bg, var(--text-bg));
		border: 2px solid var(--eunice-border, var(--border));
		box-shadow: var(--eunice-box-shadow, var(--box-shadow));
	}

	.right .speaker {
		left: auto;
		right: 0;
		transform: translate(var(--speaker-overhang), -50%);
		background: var(--minji-text-bg, var(--text-bg));
		border: 2px solid var(--minji-border, var(--border));
		box-shadow: var(--minji-box-shadow, var(--box-shadow));
	}

	@media (max-width: 600px) {
		.speaker,
		.text-block {
			font-size: var(--14px);
		}
	}
</style>
