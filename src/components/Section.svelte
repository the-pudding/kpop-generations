<script>
	import Nodes from "$components/Nodes.svelte";
	import Songs from "$components/Songs.svelte";

	let { id, heading, years, coverImg, nodes, songs } = $props();
</script>

<section {id}>
	<div class="cover">
		<img src={`assets/${id}/cover.png`} />
		<div class="years">({years})</div>
	</div>

	<h2>{heading}</h2>

	<Nodes {id} {nodes} />
	<!-- <Songs {songs} /> -->
</section>

<style>
	section {
		padding: 0 2rem;
	}

	.cover {
		position: relative;
		max-width: 842px;
		margin: 0 auto;
	}

	.cover img {
		grid-column: 2;
		border: 2px solid black;
		border-radius: var(--border-radius);
		margin: 3rem 0;
	}

	.years {
		font-weight: bold;
		position: absolute;
		bottom: 0;
		transform: translate(-20%, 50%);
		background: white;
		border: 2px solid black;
		width: fit-content;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
	}

	h2 {
		text-align: center;
		text-transform: uppercase;
	}

	.images {
		grid-column: 2;
		display: flex;
		gap: 1rem;
		margin: 3rem 0;
	}
</style>
