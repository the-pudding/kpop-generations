<script>
	import _ from "lodash";
	import data from "$data/concerts.csv";
	import LineChart from "$components/helpers/LineChart.svelte";
	import losAngelesSvg from "$svg/maps/los-angeles.svg";
	import chicagoSvg from "$svg/maps/chicago.svg";
	import newYorkCitySvg from "$svg/maps/new-york-city.svg";
	import atlantaSvg from "$svg/maps/atlanta.svg";
	import dallasFortWorthSvg from "$svg/maps/dallas-fort-worth.svg";

	let { title } = $props();

	const marketsData = [
		{ city: "Los Angeles", concerts: 198, svg: losAngelesSvg },
		{ city: "Chicago", concerts: 154, svg: chicagoSvg },
		{ city: "New York City", concerts: 146, svg: newYorkCitySvg },
		{ city: "Atlanta", concerts: 129, svg: atlantaSvg },
		{ city: "Dallas/Fort Worth", concerts: 107, svg: dallasFortWorthSvg }
	];

	const cleaned = data.map((d) => ({
		year: +d.Year,
		usConcerts: +d["US Concerts"]
	}));
</script>

<h3>{title}</h3>
<div class="chart-container">
	<LineChart data={cleaned} xKey="year" yKey="usConcerts" stroke="white" />
</div>
<div class="markets">
	<h4>Top markets</h4>

	<div class="maps">
		{#each marketsData as { city, concerts, svg }}
			{@const id = _.kebabCase(city)}
			<div class="map">
				{@html svg}
				<div class="num">{concerts} shows</div>
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
	}

	.maps {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.map {
		flex: 0 0 100px;
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
