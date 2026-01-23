<script>
	import copy from "$data/copy.json";
	import kpopSvg from "$svg/k-pop.svg";
</script>

<div class="title">
	<div class="kpop">
		{@html kpopSvg}
	</div>
	<div class="byline">
		{#each copy.byline as author}
			<div class="author">{@html author}</div>
		{/each}
	</div>
</div>

<style>
	.title {
		height: calc(100svh);
		padding-top: 4rem;
		background: linear-gradient(
			to bottom,
			#f6f5ff,
			#c0baff 34%,
			#c0baff 81%,
			#6cb0f9
		);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3rem;
	}

	.kpop {
		max-width: 1000px;
		margin: 0 auto;
	}

	.byline {
		text-transform: uppercase;
		color: #f2fafe;
		background: rgba(242, 250, 254, 0.1);
		box-shadow: inset 0px 3px 40px #ccffed;
		border-radius: var(--border-radius);
		padding: 1.5rem;
		width: fit-content;
		text-align: center;
	}

	.author {
		font-size: var(--14px);
	}

	.author:nth-of-type(1) {
		font-size: var(--18px);
	}

	.author:nth-of-type(2) {
		margin-bottom: 1rem;
	}
</style>
