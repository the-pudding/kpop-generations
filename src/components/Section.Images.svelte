<script>
	import { getContext, onMount, tick } from "svelte";
	import { current } from "$runes/misc.svelte.js";

	let { nodeId, sectionId, images } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let els = [];

	let hasLoaded = $state(false);

	$effect(async () => {
		const order = [
			"first-gen",
			"second-gen",
			"third-gen",
			"fourth-gen",
			"fifth-gen"
		];

		const currentIndex = order.indexOf(current.section);
		const myIndex = order.indexOf(sectionId);

		if (currentIndex >= myIndex - 1 && !hasLoaded) {
			hasLoaded = true;
		}
	});

	$effect(() => {
		if (!hasLoaded) return;

		const observer = new ResizeObserver(() => {
			els.forEach((el, i) => {
				registerNode(`${nodeId}-${i}`, el);
			});
		});

		els.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
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
					src={hasLoaded ? `assets/img/${sectionId}/${src}` : undefined}
				></video>
				<a class="caption" href={link} target="_blank">Full video</a>
			{:else}
				<img
					class:rectangle={shape === "rectangle"}
					class:circle={shape === "circle"}
					class:oval={shape === "oval"}
					style:transform={`rotate(${Math.random() * 8 - 4}deg)`}
					src={hasLoaded ? `assets/img/${sectionId}/${src}` : undefined}
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
		z-index: 2;
	}

	.image-wrapper {
		flex: 1 1 120px;
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

	@media (max-width: 600px) {
		.images-container {
			gap: 0.25rem;
		}
	}
</style>
