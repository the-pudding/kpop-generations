<script>
	import concertSvg from "$svg/concerts-chart.svg";

	let { title } = $props();
</script>

<h3>{title}</h3>
{@html concertSvg}

<style>
	h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}
</style>
