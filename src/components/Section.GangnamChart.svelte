<script>
	import * as d3 from "d3";
	import data from "$data/gangnam-style.csv";
	import _ from "lodash";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	let { title, subtitle, availableWidth } = $props();

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
	const highlighted = ["See You Again", "Gangam Style", "Hello"];
</script>

<h3>{@html title}</h3>
<h4>{@html subtitle}</h4>

{#if availableWidth > 0}
	<svg {width} {height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			<!-- y grid + labels -->
			{#each yTicks as t, i}
				<g transform={`translate(0,${y(t)})`}>
					<line x1="0" x2={innerWidth} stroke-dasharray={i === 0 ? 0 : 4} />
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

			<!-- lines + labels -->
			{#each series as s}
				{@const highlight = highlighted.includes(s.video_title)}
				{@const rectWidth =
					s.video_title.length * (dimensions.width < 600 ? 8 : 9.5)}
				{@const rectHeight = dimensions.width < 600 ? 16 : 24}
				{@const f =
					s.video_title === "Gangam Style" && dimensions.width > 600
						? 19
						: s.video_title === "Gangam Style"
							? 15
							: 5}
				<path
					class="pre"
					class:highlight
					d={line(s.points.filter((p) => p.cumViews <= TARGET))}
					fill="none"
					stroke-width={1}
				/>
				<path
					class="post"
					class:highlight
					d={line(s.points.filter((p) => p.cumViews > TARGET))}
					fill="none"
					stroke-width={1}
				/>

				{#if highlight}
					<rect
						class="bg"
						x={x(s.points[Math.floor(s.points.length / f)].date)}
						y={y(s.points[Math.floor(s.points.length / f)].cumViews)}
						width={rectWidth}
						height={rectHeight}
					/>
					<text
						class="highlight-label"
						x={x(s.points[Math.floor(s.points.length / f)].date)}
						y={y(s.points[Math.floor(s.points.length / f)].cumViews)}
						>{s.video_title === "Gangam Style"
							? "Gangnam Style"
							: s.video_title}</text
					>
				{/if}
			{/each}

			<!-- 1B cutoff -->
			<line
				class="billion"
				x1="0"
				x2={innerWidth}
				y1={y(TARGET)}
				y2={y(TARGET)}
				stroke-width="2"
			/>
		</g>
	</svg>
{/if}

<style>
	h3 {
		font-size: var(--16px);
		text-transform: uppercase;
		align-self: start;
		padding-left: 50px;
		margin-bottom: 0;
	}

	h4 {
		font-size: var(--12px);
		align-self: start;
		padding-left: 50px;
		margin-top: 0.5rem;
		color: var(--color-gray-600);
	}

	line {
		stroke: var(--color-gray-400);
	}

	line.billion {
		stroke: var(--color-gray-900);
	}

	text {
		fill: var(--color-gray-600);
	}

	text.highlight-label {
		fill: var(--text-color);
		font-size: var(--14px);
		font-weight: bold;
		text-anchor: middle;
		transform-box: fill-box;
		transform-origin: center;
		transform: rotate(279deg);
	}

	rect.bg {
		fill: #fffafc;
		transform-box: fill-box;
		transform-origin: center;
		transform: translate(-50%, -60%) rotate(279deg);
	}

	path.pre {
		stroke: rgba(0, 0, 0, 0.15);
	}

	path.post {
		stroke: rgba(0, 0, 0, 0.05);
	}

	path.highlight {
		stroke-width: 2.5;
	}

	path.highlight.pre {
		stroke: var(--text-color);
	}

	path.highlight.post {
		stroke: rgba(210, 85, 243, 0.2);
	}

	@media (max-width: 600px) {
		h3 {
			font-size: var(--14px);
		}

		h3,
		h4 {
			padding-left: 12px;
		}

		text.highlight-label {
			font-size: var(--12px);
		}
	}
</style>
