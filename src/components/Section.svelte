<script>
	import Text from "$components/Section.Text.svelte";
	import Image from "$components/Section.Image.svelte";
	import Images from "$components/Section.Images.svelte";

	let { id, heading, years, coverImg, nodes } = $props();

	const components = {
		Text,
		Image,
		Images
	};
</script>

<section {id}>
	<div class="cover">
		<img src={`assets/${id}/cover.png`} />
		<div class="years">({years})</div>
	</div>

	<h2>{heading}</h2>

	<div class="grid">
		{#each nodes as { type, value }}
			{@const C = components[type]}
			{#if C}
				<C {id} {...value} />
			{/if}
		{/each}
	</div>
</section>

<style>
	section {
	}

	.cover {
		position: relative;
		max-width: 842px;
		margin: 0 auto;
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

	.grid {
		--margin: clamp(140px, 12vw, 300px);

		display: grid;
		width: 100%;
		grid-template-columns:
			var(--margin)
			minmax(0, 1fr)
			var(--margin);
		justify-items: center;
	}

	img {
		grid-column: 2;
		border: 2px solid black;
		border-radius: var(--border-radius);
		margin: 3rem 0;
	}

	.images {
		grid-column: 2;
		display: flex;
		gap: 1rem;
		margin: 3rem 0;
	}
</style>
