<script>
	import themes from "$data/themes.json";
	import Nodes from "$components/Nodes.svelte";
	import mostInView from "$actions/mostInView.js";

	let { id, heading, years, coverAlt, nodes } = $props();

	const style = Object.entries(themes[id] || {})
		.filter(([key, value]) => !key.endsWith("-style"))
		.map(([key, value]) => `--${key}: ${value}`)
		.join(";");
</script>

<section {id} {style} use:mostInView={id}>
	<div class="cover">
		<img src={`assets/img/${id}/cover.png`} alt={coverAlt} />
		<div class="years">({years})</div>
	</div>

	<h2>{heading}</h2>

	<Nodes {id} {nodes} />
</section>

<style>
	section {
		--years-overhang: 1.75rem;

		padding: 5rem 2rem;
		font-family: var(--font-body);
		background: linear-gradient(to bottom, var(--background));
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cover {
		position: relative;
		max-width: 842px;
		margin: 0 auto;
	}

	.cover img {
		border: 2px solid var(--border);
		border-radius: var(--border-radius);
	}

	.years {
		font-weight: bold;
		position: absolute;
		bottom: 0;
		transform: translate(calc(-1 * var(--years-overhang)), 50%);
		background: var(--text-bg);
		color: var(--text-color);
		border: 2px solid var(--border);
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		text-transform: uppercase;
	}

	h2 {
		font-size: 92px;
		width: 100%;
		max-width: 1000px;
		line-height: 1.1;
		margin: 2rem 0;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		font-family: "ABC Maxi Plus";
		color: var(--heading-color);
		text-shadow: var(--heading-shadow);
	}

	@media (max-width: 600px) {
		section {
			padding: 3rem 2rem;
		}

		h2 {
			font-size: 48px;
		}

		.years {
			font-size: var(--12px);
		}
	}

	@media (max-width: 400px) {
		h2 {
			font-size: 48px;
		}
	}
</style>
