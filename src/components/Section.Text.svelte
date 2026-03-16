<script>
	import Song from "$components/Song.svelte";
	import themes from "$data/themes.json";
	import { getContext, onMount } from "svelte";
	import inView from "$actions/inView.js";

	let { sectionId, nodeId, speaker, text, song } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;
	let visible = $state(false);

	function handleEnter() {
        visible = true;
    }

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
		class:is-visible={visible}
		bind:this={el}
		style={themes[sectionId]["text-style"]}
		use:inView
		onenter={handleEnter}
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
	<div
		class="text-wrapper"
		class:reverse={(speaker === "eunice" && song.direction === "before") ||
			(speaker === "minji" && song.direction === "after")}
	>
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
		gap: 1.5rem;
		z-index: 2;
	}

	.text-block {
		--speaker-overhang: 1.75rem;
		border-radius: var(--border-radius);
		padding: 2rem;
		width: calc(100% - var(--speaker-overhang));
		max-width: 666px;
		position: relative;
	}

	@media (prefers-reduced-motion: no-preference) {
        .text-block {
			opacity: 0;
            transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out;
            transition-property: transform, opacity !important;
            will-change: transform, opacity;
        }

        .text-block.left {
            transform: translateX(-30px) !important;
        }

        .text-block.right {
            transform: translateX(30px) !important;
        }

        .text-block.is-visible {
			opacity: 1;
            transform: translateX(0) !important;
        }
    }

	@media (prefers-reduced-motion: reduce) {
        .text-block.left, .text-block.right {
            transform: none !important;
        }
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

	.text-block.is-visible {
		opacity: 1;
	}

	.speaker {
		text-transform: uppercase;
		font-weight: bold;
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		position: absolute;
		top: 0;
		will-change: transform, opacity;
		-webkit-backface-visibility: hidden;
    	backface-visibility: hidden;
		transform-style: preserve-3d;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.left .speaker {
		left: 0;
		right: auto;
		transform: translate(calc(-1 * var(--speaker-overhang)), -50%) translateZ(0);
		background: var(--eunice-text-bg, var(--text-bg));
		border: 2px solid var(--eunice-border, var(--border));
		box-shadow: var(--eunice-box-shadow, var(--box-shadow));
	}

	.right .speaker {
		left: auto;
		right: 0;
		transform: translate(var(--speaker-overhang), -50%) translateZ(0);
		background: var(--minji-text-bg, var(--text-bg));
		border: 2px solid var(--minji-border, var(--border));
		box-shadow: var(--minji-box-shadow, var(--box-shadow));
	}

	:global(#third-gen .content .left .speaker) {
		background: var(--text-color) !important;
		color: #000000;
	}

	:global(#third-gen .content .right .speaker) {
		background: var(--minji-text-color) !important;
		color: #000000;
	}

	:global(#fourth-gen .content .right .speaker, #fourth-gen .content .left .speaker) {
		color: #000000;
	}

	:global(#fifth-gen .content .right .speaker, #fifth-gen .content .left .speaker) {
		background: rgba(255,255,255,0.8) !important;
		color: #000000;
	}

	@media (max-width: 600px) {
		.text-block {
			font-size: var(--14px);
		}

		.speaker {
			font-size: var(--12px);
		}

		.text-wrapper {
			flex-direction: column;
		}

		.text-wrapper.reverse {
			flex-direction: column-reverse;
		}

		.text-block {
			padding: 1rem 1.5rem;
		}
	}
</style>
