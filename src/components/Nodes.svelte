<script>
	import { setContext } from "svelte";
	import Text from "$components/Section.Text.svelte";
	import Image from "$components/Section.Image.svelte";
	import Images from "$components/Section.Images.svelte";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	let { id, nodes } = $props();

	const components = {
		Text,
		Image,
		Images
	};

	const connections = [
		{
			from: "first-gen-0",
			to: "first-gen-1",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-1",
			to: "first-gen-2-0",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-1",
			to: "first-gen-2-1",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-1",
			to: "first-gen-2-2",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-2-0",
			to: "first-gen-3",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-2-1",
			to: "first-gen-3",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-2-2",
			to: "first-gen-3",
			fromSide: "bottom",
			toSide: "top"
		},
		{
			from: "first-gen-3",
			to: "first-gen-4",
			fromSide: "right",
			toSide: "top"
		}
	];

	const curvedPath = (a, b) => {
		const r = 20;

		const midY = (a.y + b.y) / 2;
		const vDir = b.y > a.y ? 1 : -1;
		const hDir = b.x > a.x ? 1 : -1;

		return `
    M ${a.x},${a.y}
    L ${a.x},${midY - r * vDir}
    Q ${a.x},${midY}
      ${a.x + r * hDir},${midY}
    L ${b.x - r * hDir},${midY}
    Q ${b.x},${midY}
      ${b.x},${midY + r * vDir}
    L ${b.x},${b.y}
  `;
	};

	const registerNode = (id, el) => {
		nodeEls.set(id, el);
		nodeEls = new Map(nodeEls);
	};

	setContext("nodeRegistry", {
		registerNode
	});

	let svgEl = $state();
	let nodeEls = $state(new Map());
	let anchors = $state({});

	const calculateAnchors = () => {
		if (!svgEl) return {};

		const svgRect = svgEl.getBoundingClientRect();
		const result = {};

		for (const [nodeId, el] of nodeEls) {
			const rect = el.getBoundingClientRect();

			const toSvgSpace = (x, y) => ({
				x: x - svgRect.left,
				y: y - svgRect.top
			});

			result[nodeId] = {
				top: toSvgSpace(rect.left + rect.width / 2, rect.top),
				bottom: toSvgSpace(rect.left + rect.width / 2, rect.bottom),
				left: toSvgSpace(rect.left, rect.top + rect.height / 2),
				right: toSvgSpace(rect.right, rect.top + rect.height / 2)
			};
		}

		anchors = result;
	};

	$effect(() => calculateAnchors(nodeEls, dimensions.width));
</script>

<div class="column">
	<svg id={`${id}-svg`} bind:this={svgEl}>
		<!-- {#each Object.values(anchors) as a}
			<circle cx={a.top.x} cy={a.top.y} r="8" fill="darkblue" />
			<circle cx={a.bottom.x} cy={a.bottom.y} r="8" fill="darkblue" />
			<circle cx={a.left.x} cy={a.left.y} r="8" fill="darkblue" />
			<circle cx={a.right.x} cy={a.right.y} r="8" fill="darkblue" />
		{/each} -->

		{#each connections as { from, to, fromSide, toSide }}
			{#if anchors[from] && anchors[to]}
				<path
					d={curvedPath(anchors[from][fromSide], anchors[to][toSide])}
					stroke="black"
					fill="none"
					stroke-width="2"
				/>
			{/if}
		{/each}
	</svg>
	{#each nodes as { type, value }, i}
		{@const C = components[type]}

		<div class="node">
			<C sectionId={id} nodeId={`${id}-${i}`} {...value} />
		</div>
	{/each}
</div>

<style>
	.column {
		grid-column: 2;
		position: relative;
	}

	svg {
		background: var(--color-gray-200);
		grid-column: 2;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
	}
</style>
