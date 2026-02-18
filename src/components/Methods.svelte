<script>
	import copy from "$data/copy.json";
</script>

<section id="methods">
	<div class="wrapper">
		{#each copy.methods as { type, value }}
			{#if type === "header"}
				<h3>{@html value}</h3>
			{:else if type === "text"}
				<p>{@html value}</p>
			{/if}
		{/each}
	</div>
</section>

<style>
	section {
		padding: 5rem 2rem;
		background: linear-gradient(#8d8aab, #e6e4ff 80%);
	}

	h3 {
		margin: 0;
	}

	.wrapper {
		max-width: 900px;
		margin: 0 auto;
		background: #f2fafe;
		border: 2px solid black;
		border-radius: var(--border-radius);
		padding: 1.5rem;
		width: fit-content;
	}
</style>
