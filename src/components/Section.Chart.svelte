<script>
	import DebutChart from "$components/Section.DebutChart.svelte";
	import GangnamChart from "$components/Section.GangnamChart.svelte";
	import YouTubeChart from "$components/Section.YouTubeChart.svelte";
	import themes from "$data/themes.json";
	import { getContext, onMount } from "svelte";
	import _ from "lodash";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	let { id, title, subtitle, nodeId, sectionId } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;
	let width = $state(0);
	let padding = $derived(dimensions.width < 600 ? 16 : 32);
	let availableWidth = $derived(width - 2 * padding);

	onMount(() => {
		registerNode(nodeId, el);
	});

	const components = {
		debuts: DebutChart,
		"gangnam-style": GangnamChart,
		"youtube-records": YouTubeChart
	};
	const C = components[id];
</script>

<div
	id={nodeId}
	bind:this={el}
	bind:clientWidth={width}
	class="chart"
	style={themes[sectionId]["text-style"] + `; --padding: ${padding}px;`}
>
	<C {title} {subtitle} {availableWidth} />
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
		background: var(--text-bg);
		border: 2px solid var(--border);
		border-radius: var(--border-radius);
		outline-color: var(--border);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		margin: 3rem 0;
		padding: var(--padding);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.chart#second-gen-7 {
		background: #fffafc;
	}

	@media (max-width: 600px) {
		:global(.chart h3) {
			font-size: var(--20px);
		}
	}
</style>
