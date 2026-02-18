<script>
	import copy from "$data/copy.json";
	import titleSvg from "$svg/kpop.svg";
	import growingUpSvg from "$svg/growing-up-with.svg";
	import _ from "lodash";
</script>

<div id="title">
	<h1 class="sr-only">{copy.landing.title}</h1>
	<div class="svg-wrapper">
		{@html growingUpSvg}
		{@html titleSvg}
	</div>

	<div class="intros">
		{#each ["eunice", "minji"] as name}
			<div class="intro">
				<div class="img"></div>
				<div class="caption">Hi, I'm {_.startCase(name)}!</div>
			</div>
		{/each}
	</div>

	<div class="context">
		{@html copy.landing.context}
	</div>
</div>

<style>
	#title {
		padding: 4rem 1rem 1rem 1rem;
		background: linear-gradient(
			to bottom,
			#f6f5ff,
			#c0baff 34%,
			#c0baff 81%,
			#6cb0f9
		);
	}

	.svg-wrapper {
		position: relative;
		max-width: 1000px;
		margin: 6rem auto;
	}

	.intros {
		display: flex;
		justify-content: space-evenly;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.img {
		border: 2px solid black;
		height: 200px;
		width: 200px;
	}

	.context {
		max-width: 600px;
		margin: 4rem auto;
		text-align: center;
		font-size: var(--18px);
	}

	:global(#title svg#growing-up-with) {
		position: absolute;
		width: 35%;
		min-width: 200px;
		left: 24%;
		top: 0;
	}

	@media (max-width: 600px) {
		:global(#title svg#growing-up-with) {
			transform: translate(0, -20%);
		}
	}

	@media (max-width: 400px) {
		:global(#title svg#growing-up-with) {
			transform: translate(-20%, -40%);
		}
	}
</style>
