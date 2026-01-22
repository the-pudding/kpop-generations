<script>
	import themes from "$data/themes.json";
	import { getContext } from "svelte";

	let { sectionId, nodeId, src, alt, shape } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;

	const boxShadows =
		themes[sectionId]["box-shadow"] !== ""
			? themes[sectionId]["box-shadow"]
					?.split(/,(?![^(]*\))/)
					.map((s) => s.trim())
			: [];

	const insetShadows = boxShadows
		.filter((d) => d.startsWith("inset"))
		.join(", ");
</script>

<div id={nodeId} class="image-wrapper" style="--inset-shadows: {insetShadows}">
	<img
		src={`assets/img/${sectionId}/${src}`}
		bind:this={el}
		class:rectangle={shape === "rectangle"}
		class:circle={shape === "circle"}
		class:oval={shape === "oval"}
		{alt}
		onload={() => {
			registerNode(nodeId, el);
		}}
	/>
</div>

<style>
	.image-wrapper {
		max-width: 300px;
		margin: 3rem auto;
		position: relative;
		display: inline-block;
	}

	.image-wrapper::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: var(--border-radius);
		box-shadow: var(--inset-shadows);
	}

	img {
		margin: 0 auto;
		border: 2px solid var(--border);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
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
