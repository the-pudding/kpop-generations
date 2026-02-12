<script>
	import data from "$data/debuts.csv";
	import _ from "lodash";

	let { title } = $props();

	let tooltipData = $state({});
	let tooltipX = $state();
	let tooltipY = $state();
	let tooltipTransform = $state();

	const groupedData = _.groupBy(data, "gen");
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
		const { gen, year, group, favorites } = e.target.dataset;
		tooltipData = { gen, year, group, favorites };
		const leftSide = e.target.offsetLeft < window.innerWidth / 2;
		tooltipX = e.target.offsetLeft + 20;
		tooltipY = e.target.offsetTop + 20;
		if (!leftSide) {
			tooltipTransform = "translate(-100%, 0)";
		}
	};

	const mouseLeave = () => {
		tooltipData = {};
		tooltipX = undefined;
		tooltipY = undefined;
		tooltipTransform = undefined;
	};
</script>

<h3>{title}</h3>

<div class="legend">
	<div class="dot both-fave" />
	<div>Minji and Eunice's favorites!</div>
</div>

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
					{#each data as { gen, year, group, favorites }}
						<div
							class="dot"
							class:active={tooltipData.gen == gen &&
								tooltipData.year == year &&
								tooltipData.group == group}
							class:minji-fave={favorites === "Minji"}
							class:eunice-fave={favorites === "Eunice"}
							class:both-fave={favorites.includes("Minji") &&
								favorites.includes("Eunice")}
							data-gen={gen}
							data-year={year}
							data-group={group}
							data-favorites={favorites}
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
	style:transform={tooltipTransform}
>
	<div class="group">{tooltipData.group}</div>
	<div class="year">Debuted in {tooltipData.year}</div>
	{#if tooltipData.favorites}
		<div class="favorites">({tooltipData.favorites}'s favorite!)</div>
	{/if}
</div>

<style>
	h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
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

	.dot.minji-fave,
	.dot.eunice-fave,
	.dot.both-fave {
		background: var(--minji-text-color);
	}

	.dot.active {
		background: #fffafc;
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
		width: fit-content;
		visibility: hidden;
	}

	.tooltip.visible {
		visibility: visible;
	}

	.legend {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: var(--12px);
		color: var(--minji-text-color);
		margin-bottom: 16px;
	}

	.group {
		font-size: var(--20px);
		font-weight: bold;
		white-space: nowrap;
	}

	.year {
		white-space: nowrap;
		font-size: var(--12px);
	}

	.favorites {
		font-size: var(--12px);
	}

	@media (max-width: 600px) {
		.gens {
			flex-direction: column;
		}
	}
</style>
