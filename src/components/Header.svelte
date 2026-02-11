<script>
	import _ from "lodash";
	import copy from "$data/copy.json";
	import wordmark from "$svg/wordmark-bubble.svg";
	import { getContext } from "svelte";

	const current = getContext("current");

	const onClick = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>

	<nav>
		<ul>
			{#each copy.sections as { id, years }}
				{@const active = current.section === id}
				{@const title = _.upperCase(id)}
				<li class:active onclick={() => onClick(id)}>
					<span class="circle"></span>
					<div class="label">
						<div>{title}</div>
						<div class="years">{years}</div>
					</div>
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
		height: 4rem;
		padding: 1rem;

		background-image: linear-gradient(
			to bottom,
			#f9458e,
			#fd6766 30%,
			rgba(253, 103, 102, 0)
		);
	}

	.wordmark {
		grid-column: 2;
		justify-self: center;
		height: 80%;
		width: fit-content;
		transform: rotate(-4deg);
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
	}

	nav ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	nav li {
		display: flex;
		align-items: center;
		gap: 6px;
		opacity: 0.4;
		transition: opacity 0.2s;
	}

	nav li:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	nav li.active {
		opacity: 1;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		transition: opacity 0.2s;
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

		.wordmark {
			display: none;
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
