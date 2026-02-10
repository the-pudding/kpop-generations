<script>
	import data from "$data/youtube-records.csv";
	import { scaleLinear } from "d3-scale";
	import { max } from "d3-array";

	let { title } = $props();

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => +d.views.replace("M", ""))])
		.range([0, 100]);
</script>

<h3>{@html title}</h3>

<table>
	<tbody>
		{#each data as { rank, artist, song, link, views }}
			<tr>
				<td>{rank}</td>
				<td>{artist} - {song}</td>
				<td class="nowrap">
					{views} views
					<div
						class="bar"
						style:width={`${xScale(+views.replace("M", ""))}%`}
					></div>
				</td>
				<td class="nowrap"><a href={link} target="_blank">Watch Video</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}

	table {
		table-layout: auto;
	}

	tr {
	}

	td {
		position: relative;
		padding: 0.75rem;
	}

	.bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		height: 100%;
		pointer-events: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.nowrap {
		white-space: nowrap;
	}

	a {
		text-decoration: none;
		border-radius: calc(var(--border-radius) / 2);
		box-shadow: var(--box-shadow);
		padding: 0.5rem 1rem;
		text-transform: uppercase;
	}
</style>
