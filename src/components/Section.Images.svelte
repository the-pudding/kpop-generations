<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, sectionId, images } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let els = [];

	onMount(() => {
		requestAnimationFrame(() => {
			els.forEach((el, i) => {
				registerNode(`${nodeId}-${i}`, els[i]);
			});
		});
	});
</script>

<div id={nodeId} class="images-container">
	{#each images as { src, alt, shape, style, link }, i}
		<div class="image-wrapper" {style} bind:this={els[i]}>
			{#if src.includes("mp4")}
				<video
					autoplay={true}
					loop={true}
					muted={true}
					playsinline={true}
					src={`assets/img/${sectionId}/${src}`}
				></video>
				<a class="caption" href={link} target="_blank">Full video</a>
			{:else}
				<img
					class:rectangle={shape === "rectangle"}
					class:circle={shape === "circle"}
					class:oval={shape === "oval"}
					style:transform={`rotate(${Math.random() * 8 - 4}deg)`}
					src={`assets/img/${sectionId}/${src}`}
					{alt}
				/>
			{/if}
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

	.image-wrapper {
		flex: 1 1 100px;
		max-width: 250px;
	}

	img,
	video {
		border: 2px solid var(--border);
	}

	.rectangle,
	video {
		border-radius: var(--border-radius);
	}

	.circle {
		border-radius: 100%;
	}

	.oval {
		border-radius: 1000px;
	}

	.caption {
		display: block;
		font-size: var(--12px);
		color: var(--text-color);
		margin-top: 0.5rem;
		text-align: center;
	}
</style>
