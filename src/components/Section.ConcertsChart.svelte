<script>
	import _ from "lodash";
	import data from "$data/concerts.csv";
	import LineChart from "$components/helpers/LineChart.svelte";

	let { title } = $props();

	const emergingData = [
		{ city: "Seattle", increase: "1,250", svg: "seattleSvg" },
		{ city: "Oakland", increase: "1,200", svg: "oaklandSvg" },
		{ city: "Washington DC", increase: "1,150", svg: "washingtonDCSvg" },
		{ city: "Phoenix", increase: "900", svg: "phoenixSvg" },
		{ city: "Boston", increase: "800", svg: "bostonSvg" },
		{ city: "Orlando", increase: "600", svg: "orlandoSvg" },
	];

	const cleaned = data.map((d) => ({
		year: +d.year,
		usConcerts: +d["concerts"]
	}));
</script>

<h3>{title}</h3>
<div class="chart-container">
	<LineChart data={cleaned} xKey="year" yKey="usConcerts" stroke="white" />
</div>
<div class="markets">
	<h4>Emerging markets</h4>

	<div class="maps">
		{#each emergingData as { city, increase, svg }}
			{@const id = _.kebabCase(city)}
			<div class="map">
				<img src="assets/img/fourth-gen/maps/{svg}.png" alt="us map with a proportional dot over {city} representing a {increase}% increase in concerts"/>
				<div class="num">+{increase}%</div>
				<div class="city">{city}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}

	.chart-container {
		height: 300px;
		width: 100%;
		max-width: 800px;
	}

	.markets {
		align-self: start;
		width: 100%;
		margin-top: 2rem;
	}

	.maps {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.map {
		width: 14%;
		font-size: var(--14px);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h4 {
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--18px);
	}

	.num,
	.city {
		font-weight: bold;
		text-align: center;
	}

	@media (max-width: 700px) {
		.map {
			width: 30%;
		}
	}

	@media (max-width: 600px) {
		.chart-container {
			height: 250px;
		}

		.maps {
			gap: 0.25rem;
		}

		.num,
		.city {
			font-size: var(--12px);
		}
	}
</style>
