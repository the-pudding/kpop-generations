<script>
	import { scaleLinear, scaleTime } from "d3-scale";
	import { extent, max } from "d3-array";
	import { timeFormat } from "d3-time-format";
	import { format } from "d3-format";
	import { line, curveMonotoneX } from "d3-shape";

	let {
		data = [],
		xKey = "x",
		yKey = "y",
		margin = { top: 20, right: 20, bottom: 30, left: 40 },
		stroke
	} = $props();

	let width = $state(0);
	let height = $state(0);

	// ---- Layout ----
	const innerWidth = $derived(width - margin.left - margin.right);
	const innerHeight = $derived(height - margin.top - margin.bottom);

	// ---- Detect if x values are Dates ----
	const isTime = $derived(data.length > 0 && data[0][xKey] instanceof Date);

	// ---- X Scale ----
	const xScale = $derived(
		(isTime ? scaleTime() : scaleLinear())
			.domain(extent(data, (d) => d[xKey]))
			.range([0, innerWidth])
	);

	// ---- Y Scale ----
	const yScale = $derived(
		scaleLinear()
			.domain([0, max(data, (d) => d[yKey])])
			.nice()
			.range([innerHeight, 0])
	);

	// ---- Line Generator ----
	const linePath = $derived(
		line()
			.x((d) => xScale(d[xKey]))
			.y((d) => yScale(d[yKey]))
			.curve(curveMonotoneX)(data)
	);

	// Ticks
	const xTicks = $derived(xScale.ticks(4));
	const yTicks = $derived(yScale.ticks(5));
</script>

<svg bind:clientWidth={width} bind:clientHeight={height}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		<!-- GRIDLINES -->
		<!-- <g class="grid">
			{#each yTicks as tick}
				<line
					x1="0"
					x2={innerWidth}
					y1={yScale(tick)}
					y2={yScale(tick)}
					{stroke}
				/>
			{/each}
		</g> -->

		<!-- Line -->
		<path d={linePath} fill="none" {stroke} stroke-width="2" />

		<!-- X AXIS -->
		<g transform={`translate(0, ${innerHeight})`}>
			{#each xTicks as tick}
				<line
					x1={xScale(tick)}
					x2={xScale(tick)}
					y1="0"
					y2={-innerHeight}
					{stroke}
				/>

				<g transform={`translate(${xScale(tick)}, 0)`}>
					<line y2="6" {stroke} />
					<text y="20" text-anchor="middle" font-size="12" fill={stroke}>
						{tick}
					</text>
				</g>
			{/each}
		</g>

		<!-- Y AXIS -->
		<g>
			{#each yTicks as tick}
				<line
					x1="0"
					x2={innerWidth}
					y1={yScale(tick)}
					y2={yScale(tick)}
					{stroke}
				/>

				<g transform={`translate(0, ${yScale(tick)})`}>
					<line x2="-6" {stroke} />
					<text
						x="-10"
						dy="0.32em"
						text-anchor="end"
						font-size="12"
						fill={stroke}
					>
						{tick}
					</text>
				</g>
			{/each}
		</g>
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	line {
		opacity: 0.4;
	}

	path {
		filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9));
	}
</style>
