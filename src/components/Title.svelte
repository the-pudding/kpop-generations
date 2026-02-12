<script>
	import copy from "$data/copy.json";
	import titleSvg from "$svg/title.svg";
	import { onMount } from "svelte";

	onMount(() => {
		const timeGap = 100;
		const duration = 600;

		const ks = document.querySelectorAll(`#title #k-pop g[id^="k"]`);
		const dashes = document.querySelectorAll(`#title #k-pop g[id^="dash"]`);
		const os = document.querySelectorAll(`#title #k-pop g[id^="o"]`);
		const ps = document.querySelectorAll(`#title #k-pop g[id^="p"]`);
		const p2s = document.querySelectorAll(`#title #k-pop g[id^="p-2"]`);

		// [ks, dashes, os, ps, p2s].forEach((group, i) => {
		// 	const delay = i * timeGap;
		// 	group.forEach((el) => {
		// 		el.style.setProperty("--delay", `${delay}ms`);
		// 		el.classList.add("bounce-in");
		// 	});
		// });

		const stars = document.querySelectorAll(`#title #k-pop #stars *`);
		stars.forEach((star, i) => {
			const enterDelay = duration / 2 + i * 400;
			const twinkleDelay = Math.random() * 400;

			// star.style.setProperty("--enter-delay", `${enterDelay}ms`);
			// star.style.setProperty("--twinkle-delay", `${twinkleDelay}ms`);
			// star.classList.add("star-enter");
		});
	});
</script>

<div id="title">
	<h1 class="sr-only">Growing Up with K-Pop</h1>
	<div class="svg-wrapper">
		{@html titleSvg}
	</div>
	<div class="byline">
		{#each copy.byline as author}
			<div class="author">{@html author}</div>
		{/each}
	</div>
</div>

<style>
	#title {
		height: calc(100svh);
		padding: 4rem 1rem 1rem 1rem;
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

	.svg-wrapper {
		position: relative;
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

	:global(#title svg g.bounce-in) {
		transform-origin: center;
		transform-box: fill-box;
		animation: bounce-in 600ms var(--delay) both;
	}

	:global(#title svg path.star-enter) {
		transform-origin: center;
		transform-box: fill-box;
		animation:
			star-enter 500ms var(--enter-delay) both,
			star-twinkle 2s var(--twinkle-delay) ease-in-out infinite;
	}

	@keyframes -global-bounce-in {
		0% {
			opacity: 0;
			transform: scale3d(0.3, 0.3, 1);
		}
		50% {
			opacity: 1;
			transform: scale3d(1, 1, 1);
		}
		70% {
			transform: scale3d(0.85, 0.85, 1);
		}
		100% {
			transform: scale3d(1, 1, 1);
		}
	}

	@keyframes -global-star-enter {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0deg);
		}

		60% {
			opacity: 1;
			transform: scale(1.15) rotate(180deg);
		}

		100% {
			opacity: 1;
			transform: scale(1) rotate(360deg);
		}
	}

	@keyframes -global-star-twinkle {
		0% {
			transform: rotate(-4deg) scale(1);
		}
		50% {
			transform: rotate(4deg) scale(1.1);
		}
		100% {
			transform: rotate(-4deg) scale(1);
		}
	}

	@media (max-width: 600px) {
		.author {
			font-size: var(--12px);
		}

		.author:nth-of-type(1) {
			font-size: var(--16px);
		}
	}

	@media (max-width: 400px) {
		.author:nth-of-type(1) {
			font-size: var(--14px);
		}
	}
</style>
