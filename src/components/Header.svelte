<script>
	import _ from "lodash";
	import { prefersReducedMotion } from "svelte/motion";
	import copy from "$data/copy.json";
	import wordmark from "$svg/wordmark-bubble.svg";
	import { current } from "$runes/misc.svelte.js";
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	const onClick = (id) => {
		const el = document.getElementById(id);
		if (el)
			el.scrollIntoView({
				behavior: prefersReducedMotion.current ? "instant" : "smooth"
			});
	};
</script>

<header>
	<div
		class="wordmark"
		class:visible={current.section === "title" || dimensions.width > 700}
	>
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>

	<nav class:visible={current.section !== "title"}>
		<ul>
			{#each copy.sections as { id, numEnd, years }}
				{@const active = current.section === id}
				{@const title = _.upperCase(id)}
				<li>
					<button onclick={() => onClick(id)} class:active>
						<div class="num">
							<img src="assets/img/{id}/num.png" alt="number for {id}"/>
						</div>
						<div class="label">
							<div>{numEnd} gen</div>
							<!-- <div class="years">{years}</div> -->
						</div>
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: var(--z-top);
		width: 100%;
		height: 7rem;
		padding: 1rem 1rem 4rem 1rem;

		background-image: linear-gradient(
			to bottom,
			#f9458e,
			#fd6766 30%,
			rgba(253, 103, 102, 0)
		);
	}

	.wordmark {
		height: 80%;
		width: fit-content;
		transform: rotate(-4deg);
		display: none;
	}

	.wordmark.visible {
		display: block;
	}

	.wordmark a {
		height: 100%;
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	nav {
		grid-column: 3;
		justify-self: end;
		color: #f2fafe;
		font-size: var(--12px);
		font-weight: bold;
		margin-left: auto;
		display: none;
	}

	nav.visible {
		display: block;
	}

	nav ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	button {
		background: none;
		padding: 0;
		color: inherit;
		display: flex;
		align-items: center;
		font-weight: bold;
		gap: 0;
		opacity: 0.4;
		transition: opacity calc(var(--1s) * 0.3);
	}

	button:hover {
		opacity: 0.8;
	}

	button.active {
		opacity: 1;
	}

	.num {
		height: 30px;
	}

	.num img {
		height: 100%;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-transform: uppercase;
	}

	.years {
		font-size: 11px;
		white-space: nowrap;
	}

	.circle {
		height: 6px;
		width: 6px;
		flex-shrink: 0;
		transform: translate(0, -1px); /* to look more centered */
		border-radius: 50%;
		display: inline-block;
		background: white;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.2);
	}

	.active .circle {
		opacity: 1;
	}

	:global(header .wordmark svg) {
		height: 100%;
		width: auto;
	}

	@media (max-width: 1200px) {
		header {
			display: flex;
			justify-content: space-between;
		}
	}

	@media (max-width: 700px) {
		header {
			justify-content: center;
		}

		nav {
			margin: 0;
		}

		li {
			text-align: center;
			line-height: 1.2;
		}
	}

	@media (max-width: 550px) {
		.years {
			display: none;
		}
	}
</style>
