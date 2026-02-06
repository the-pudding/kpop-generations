<script>
	import _ from "lodash";
	import { setContext } from "svelte";
	import Text from "$components/Section.Text.svelte";
	import Image from "$components/Section.Image.svelte";
	import Images from "$components/Section.Images.svelte";
	import DebutChart from "$components/Section.DebutChart.svelte";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	// import connections from "$data/connections.json";
	let dimensions = new useWindowDimensions();

	let { id, nodes } = $props();

	const components = {
		Text,
		Image,
		Images,
		DebutChart
	};

	const curvedPath = (a, b, aSide, bSide, offset = 50) => {
		const R = 20;

		const tooClose = Math.abs(b.x - a.x) < R * 2;
		const startX =
			tooClose && a.x < b.x ? a.x - R * 2 : tooClose ? a.x + R * 2 : a.x;
		const startY = a.y;
		const endX = b.x;
		const endY = b.y;

		let d = `M ${startX},${startY}`;

		// ---- BOTTOM → TOP ----
		if (aSide === "bottom" && bSide === "top") {
			d += `
				L ${startX},${startY + offset - R}
				A ${R},${R} 0 0 ${startX < endX ? 0 : 1} ${startX < endX ? startX + R : startX - R},${startY + offset}
				L ${startX < endX ? endX - R : endX + R},${startY + offset}
				A ${R},${R} 0 0 ${startX < endX ? 1 : 0} ${endX},${startY + offset + R}
				L ${endX},${endY}
			`;
		}

		return d;
	};

	const registerNode = (id, el) => {
		nodeEls.set(id, el);
		nodeEls = new Map(nodeEls);
	};

	setContext("nodeRegistry", {
		registerNode
	});

	let svgEl = $state();
	let anchors = $state({});
	let nodeEls = $state(new Map());
	let nodeIds = $derived(
		_.orderBy(Array.from(nodeEls.keys()), (id) => +id.split("-").at(-1))
	);

	// Always bottom -> top
	const connections = $derived(
		nodeIds.slice(0, -1).map((from, i) => ({
			from,
			to: nodeIds[i + 1],
			fromSide: "bottom",
			toSide: "top"
		}))
	);

	const calculateAnchors = () => {
		if (!svgEl) return {};

		const svgRect = svgEl.getBoundingClientRect();
		const result = {};

		for (const [nodeId, el] of nodeEls) {
			const rect = el.getBoundingClientRect();
			const outlineWidth = el.style["outline-width"] || "0px";
			const outlineOffset = el.style["outline-offset"] || "0px";
			const totalOffset = parseFloat(outlineWidth) + parseFloat(outlineOffset);

			const toSvgSpace = (x, y) => ({
				x: x - svgRect.left,
				y: y - svgRect.top
			});

			result[nodeId] = {
				top: toSvgSpace(rect.left + rect.width / 2, rect.top - totalOffset),
				bottom: toSvgSpace(
					rect.left + rect.width / 2,
					rect.bottom + totalOffset
				),
				left: toSvgSpace(rect.left, rect.top + rect.height / 2),
				right: toSvgSpace(rect.right, rect.top + rect.height / 2)
			};
		}

		anchors = result;
	};

	$effect(() => calculateAnchors(nodeEls, dimensions.width));
</script>

<div class="content">
	<svg id={`${id}-svg`} bind:this={svgEl}>
		<!-- {#each Object.values(anchors) as a}
			<circle cx={a.top.x} cy={a.top.y} r="8" fill="lightblue" />
			<circle cx={a.bottom.x} cy={a.bottom.y} r="8" fill="lightblue" />
			<circle cx={a.left.x} cy={a.left.y} r="8" fill="lightblue" />
			<circle cx={a.right.x} cy={a.right.y} r="8" fill="lightblue" />
		{/each} -->

		{#each connections as { from, to, fromSide, toSide }}
			{#if anchors[from] && anchors[to]}
				<path
					d={curvedPath(
						anchors[from][fromSide],
						anchors[to][toSide],
						fromSide,
						toSide
					)}
					fill="none"
					stroke-width="2"
				/>
			{/if}
		{/each}
	</svg>
	{#each nodes as { type, value }, i}
		{@const C = components[type]}
		<C sectionId={id} nodeId={`${id}-${i}`} {...value} />
	{/each}
</div>

<style>
	.content {
		position: relative;
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	svg {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
	}

	path {
		stroke: var(--line-stroke);
	}
</style>
