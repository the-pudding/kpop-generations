<script>
	import themes from "$data/themes.json";
	import { getContext, onMount } from "svelte";
	import _ from "lodash";

	let { title, nodeId, sectionId } = $props();
	const { registerNode } = getContext("nodeRegistry");

	let el;

	let fakeData = [];
	for (let i = 0; i < 33; i++) {
		fakeData = [
			...fakeData,
			{ gen: 1, year: 1995 + i, group: `Group ${i + 1}` }
		];
	}
	for (let i = 0; i < 81; i++) {
		fakeData = [
			...fakeData,
			{ gen: 2, year: 1995 + i, group: `Group ${i + 1}` }
		];
	}
	for (let i = 0; i < 327; i++) {
		fakeData = [
			...fakeData,
			{ gen: 3, year: 1995 + i, group: `Group ${i + 1}` }
		];
	}
	for (let i = 0; i < 347; i++) {
		fakeData = [
			...fakeData,
			{ gen: 4, year: 1995 + i, group: `Group ${i + 1}` }
		];
	}
	for (let i = 0; i < 131; i++) {
		fakeData = [
			...fakeData,
			{ gen: 5, year: 1995 + i, group: `Group ${i + 1}` }
		];
	}

	let tooltipData = $state({});
	let tooltipX = $state();
	let tooltipY = $state();

	const groupedData = _.groupBy(fakeData, "gen");
	const groups = [
		{
			id: 1,
			name: "1st Gen",
			years: "1992-2002"
		},
		{
			id: 2,
			name: "2nd Gen",
			years: "2003-2011"
		},
		{
			id: 3,
			name: "3rd Gen",
			years: "2012-2017"
		},
		{
			id: 4,
			name: "4th Gen",
			years: "2018-2022"
		},
		{
			id: 5,
			name: "5th Gen",
			years: "2023-2025"
		}
	];

	const mouseEnter = (e) => {
		const { gen, year, group } = e.target.dataset;
		tooltipData = { gen, year, group };

		const leftSide = e.target.offsetLeft < el.clientWidth / 2;
		tooltipX = leftSide ? e.target.offsetLeft + 20 : e.target.offsetLeft - 220;
		tooltipY = e.target.offsetTop + 20;
	};

	const mouseLeave = () => {
		tooltipData = {};
		tooltipX = undefined;
		tooltipY = undefined;
	};

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<div
	id={nodeId}
	bind:this={el}
	class="debut-chart"
	style={themes[sectionId]["text-style"]}
>
	<h3>{title}</h3>

	<div class="gens">
		{#each groups as { id, name, years }}
			{@const data = groupedData[id]}
			{#if data}
				<div class="gen">
					<div class="title">
						<strong>{name}</strong> <span class="years">{years}</span>
					</div>
					<div class="count">{data.length} groups</div>
					<div class="dots">
						{#each data as d}
							<div
								class="dot"
								class:active={tooltipData.gen == d.gen &&
									tooltipData.year == d.year &&
									tooltipData.group == d.group}
								data-gen={d.gen}
								data-year={d.year}
								data-group={d.group}
								onmouseenter={mouseEnter}
								onmouseleave={mouseLeave}
							/>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<div
		class="tooltip"
		class:visible={tooltipData && tooltipX && tooltipY}
		style:top={`${tooltipY}px`}
		style:left={`${tooltipX}px`}
	>
		{JSON.stringify(tooltipData)}
	</div>
</div>

<style>
	.debut-chart {
		position: relative;
		width: 100%;
		background: var(--text-bg);
		border: 2px solid var(--border);
		border-radius: var(--border-radius);
		outline-color: var(--border);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		margin: 3rem 0;
		padding: 2rem;
	}

	h3 {
		text-transform: uppercase;
		text-align: center;
	}

	.gens {
		display: flex;
		gap: 1rem;
	}

	.gen {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.count,
	.years {
		font-size: var(--12px);
	}

	.dots {
		display: flex;
		gap: 2px;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.dot {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background: var(--text-color);
	}

	.dot.active {
		background: var(--minji-text-color);
	}

	.tooltip {
		position: absolute;
		top: 0;
		left: 0;
		background: black;
		border: 1px solid var(--border);
		border-radius: calc(var(--border-radius) / 2);
		box-shadow: var(--box-shadow);
		padding: 0.5rem;
		width: 200px;
		visibility: hidden;
	}

	.tooltip.visible {
		visibility: visible;
	}

	@media (max-width: 600px) {
		.gens {
			flex-direction: column;
		}
	}
</style>
