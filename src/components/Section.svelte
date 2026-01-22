<script>
	import themes from "$data/themes.json";
	import Nodes from "$components/Nodes.svelte";

	let { id, heading, years, nodes } = $props();

	const style = Object.entries(themes[id] || {})
		.map(([key, value]) => `--${key}: ${value}`)
		.join(";");
</script>

<section {id} {style}>
	<div class="cover">
		<img src={`assets/${id}/cover.png`} />
		<div class="years">({years})</div>
	</div>

	<h2>{heading}</h2>

	<Nodes {id} {nodes} />
</section>

<style>
	section {
		padding: 10rem 2rem;
		font-family: var(--font-body);
		background: linear-gradient(to bottom, var(--background));
	}

	.cover {
		position: relative;
		max-width: 842px;
		margin: 0 auto;
	}

	.cover img {
		border: var(--border);
		border-radius: var(--border-radius);
	}

	.years {
		font-weight: bold;
		position: absolute;
		bottom: 0;
		transform: translate(-20%, 50%);
		background: var(--years-bg);
		color: var(--years-color);
		border: var(--border);
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
	}

	h2 {
		font-size: 92px;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		font-family: var(--font-heading);
		color: var(--heading-color);
		text-shadow: var(--heading-shadow);
	}
</style>
