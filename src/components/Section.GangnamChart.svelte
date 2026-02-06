<script>
	import * as d3 from "d3";
	import data from "$data/gangnam-style.csv";
	import _ from "lodash";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	let { title, availableWidth } = $props();

	/* ---------- constants ---------- */
	let width = $derived(availableWidth);
	let height = $derived(dimensions.width < 600 ? 300 : 500);
	const TARGET = 1_000_000_000;
	const margin = { top: 40, right: 20, bottom: 50, left: 50 };

	const innerWidth = $derived(width - margin.left - margin.right);
	const innerHeight = $derived(height - margin.top - margin.bottom);

	/* ---------- parsing ---------- */
	const parsed = $derived(
		data.map((d) => ({
			...d,
			date: new Date(d.date),
			views: +d.views
		}))
	);

	/* ---------- group by video ---------- */
	const videos = $derived(d3.group(parsed, (d) => d.video_id));

	/* ---------- cumulative views ---------- */
	const series = $derived(
		Array.from(videos, ([video_id, values]) => {
			let cum = 0;

			const points = values
				.sort((a, b) => a.date - b.date)
				.map((d) => {
					cum += d.views;
					return {
						...d,
						cumViews: cum
					};
				});

			return {
				video_id,
				video_title: values[0].video_title,
				video_artist: values[0].video_artist,
				points
			};
		})
	);

	/* ---------- domains ---------- */
	const xDomain = $derived(d3.extent(parsed, (d) => d.date));
	const yDomain = [0, 1_500_000_000];

	/* ---------- scales ---------- */
	const x = $derived(d3.scaleTime().domain(xDomain).range([0, innerWidth]));
	const y = $derived(d3.scaleLinear().domain(yDomain).range([innerHeight, 0]));

	/* ---------- line generator ---------- */
	const line = $derived(
		d3
			.line()
			.curve(d3.curveBasis)
			.x((d) => x(d.date))
			.y((d) => y(d.cumViews))
	);

	/* ---------- ticks ---------- */
	const xTicks = $derived(x.ticks(6));
	const yTicks = [0, 500_000_000, 1_000_000_000, 1_500_000_000];
	const yLabels = {
		0: "",
		500_000_000: "500M",
		1_000_000_000: "1B",
		1_500_000_000: "1.5B"
	};

	/* ---------- highlight ---------- */
	const HIGHLIGHT_TITLE = "Gangam Style";
	const gangnamPoints = $derived(
		series.find((s) => s.video_title === HIGHLIGHT_TITLE).points
	);
</script>

<h3>{title}</h3>

{#if availableWidth > 0}
	<svg {width} {height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			<!-- y grid + labels -->
			{#each yTicks as t, i}
				<g transform={`translate(0,${y(t)})`}>
					<line
						x1="0"
						x2={innerWidth}
						stroke="var(--color-gray-900)"
						stroke-dasharray={i === 0 ? 0 : 4}
					/>
					<text x="-10" dy="0.32em" text-anchor="end" font-size="11">
						{yLabels[t]}
					</text>
				</g>
			{/each}

			<!-- x axis -->
			<g transform={`translate(0,${innerHeight})`}>
				{#each xTicks as t}
					<g transform={`translate(${x(t)},0)`}>
						<text y="20" text-anchor="middle" font-size="11">
							{d3.timeFormat("%Y")(t)}
						</text>
					</g>
				{/each}
			</g>

			<!-- lines -->
			{#each series.filter((s) => s.video_title !== HIGHLIGHT_TITLE) as s}
				<path
					d={line(s.points.filter((p) => p.cumViews <= TARGET))}
					fill="none"
					stroke={"rgba(0,0,0,0.25)"}
					stroke-width={1}
				/>
				<path
					d={line(s.points.filter((p) => p.cumViews > TARGET))}
					fill="none"
					stroke={"rgba(0,0,0,0.1)"}
					stroke-width={1}
				/>
			{/each}

			<!-- Gangnam Style -->
			<path
				d={line(gangnamPoints.filter((p) => p.cumViews <= TARGET))}
				fill="none"
				stroke={"var(--text-color)"}
				stroke-width={3}
			/>
			<path
				d={line(gangnamPoints.filter((p) => p.cumViews > TARGET))}
				fill="none"
				stroke={"rgba(210, 85, 243, 0.1)"}
				stroke-width={3}
			/>
			<text
				x={x(gangnamPoints[163].date) + 10}
				y={y(gangnamPoints[163].cumViews)}
				fill="var(--text-color)"
				class="gangnam-label"
				text-anchor="middle"
				font-weight="bold">Gangnam Style (158 days)</text
			>

			<!-- 1B cutoff -->
			<line
				x1="0"
				x2={innerWidth}
				y1={y(TARGET)}
				y2={y(TARGET)}
				stroke-width="2"
				stroke="var(--color-gray-900)"
			/>
		</g>
	</svg>
{/if}

<style>
	h3 {
		font-size: var(--16px);
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}

	.gangnam-label {
		font-size: var(--14px);
	}

	@media (max-width: 600px) {
		h3 {
			font-size: var(--14px);
		}

		.gangnam-label {
			font-size: var(--12px);
		}
	}
</style>
