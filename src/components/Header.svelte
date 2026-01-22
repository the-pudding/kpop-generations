<script>
	import _ from "lodash";
	import copy from "$data/copy.json";
	import wordmark from "$svg/wordmark-bubble.svg";

	const sectionIds = copy.sections.map((section) => section.id);
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>

	<nav>
		<ul>
			{#each ["first-gen", "second-gen", "third-gen", "fourth-gen", "fifth-gen"] as id}
				{@const title = _.upperCase(id)}
				<li>{title}</li>
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
</style>
