<script>
	import themes from "$data/themes.json";
	import Nodes from "$components/Nodes.svelte";
	import mostInView from "$actions/mostInView.js";
	import inView from "$actions/inView.js";

	let { id, heading, years, coverAlt, nodes } = $props();

	let visible = $state(false);

	function handleEnter() {
        visible = true;
    }

	const style = Object.entries(themes[id] || {})
		.filter(([key, value]) => !key.endsWith("-style"))
		.map(([key, value]) => `--${key}: ${value}`)
		.join(";");
</script>

<section {id} {style} use:mostInView={id}>
	<div class="cover"
		use:inView
		onenter={handleEnter}>
		<img src={`assets/img/${id}/cover.png`} alt={coverAlt} />
		<div class="num-wrapper" class:animate={visible}>
			<img class="num" src={`assets/img/${id}/num.png`} alt="number for {id}" />
			<img class="sparkle" src={`assets/img/title/Star1.png`} alt="sparkle" />
			<img class="sparkle" src={`assets/img/title/Star2.png`} alt="sparkle" />
		</div>
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

	.num-wrapper .num, 
	.num-wrapper .sparkle {
		opacity: 0;
		border: none;
		border-radius: 0;
		position: absolute;
		transform: scale(0) rotate(-180deg);
		transform-origin: center;
		transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); /* This mimics easeBounceOut/Elastic */
	}

	.num-wrapper {
		position: absolute;
		bottom: 1.5rem;
		left: -2rem;
		height: 10vw;
		width: 10vw;
		transform: rotate(-6deg);
	}

	.num-wrapper .num, 
	.num-wrapper .sparkle {
		opacity: 0;
		transform: scale(0) rotate(0deg);
		transform-origin: center;
		transition: all var(--1s) cubic-bezier(0.34, 1.56, 0.64, 1); /* This mimics easeBounceOut/Elastic */
	}

	.num-wrapper .num {
		height: 100%;
	}

	.num-wrapper .sparkle {
		filter: blur(1px);
		height: 2vw;
	}

	.num-wrapper.animate .num {
		opacity: 1;
		transform: scale(1) rotate(0deg);
		transition-delay: 0.5s;
	}

	.num-wrapper.animate .sparkle {
		opacity: 1;
		transform: scale(1) rotate(0deg);
		transition-delay: 0.5s;
	}

	.num-wrapper.animate .sparkle:nth-of-type(2) {
		transition-delay: 0.4s;
	}
	.num-wrapper.animate .sparkle:last-of-type {
		transition-delay: 0.6s;
	}

	.num-wrapper.animate .sparkle {
		animation: twinkle 2s infinite ease-in-out;
		animation-delay: 1s;
	}

	.num-wrapper.animate .sparkle:last-of-type {
		animation-delay: 1.5s;
	}

	@keyframes twinkle {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.4; transform: scale(0.8); }
	}

	#first-gen .num-wrapper .sparkle:nth-of-type(2) {
		top: 54%;
		left: 48%;
	}

	#first-gen .num-wrapper .sparkle:last-of-type {
		top: 20%;
		left: 20%;
	}

	#second-gen .num-wrapper .sparkle:nth-of-type(2) {
		top: 70%;
		left: 5%;
	}

	#second-gen .num-wrapper .sparkle:last-of-type {
		top: 40%;
		left: 50%;
	}

	#third-gen .num-wrapper .sparkle:nth-of-type(2) {
		top: 70%;
		left: 50%;
	}

	#third-gen .num-wrapper .sparkle:last-of-type {
		top: 5%;
		left: 8%;
	}

	#fourth-gen .num-wrapper .sparkle:nth-of-type(2) {
		top: 30%;
		left: 55%;
	}

	#fourth-gen .num-wrapper .sparkle:last-of-type {
		top: 40%;
		left: 8%;
	}

	#fifth-gen .num-wrapper .sparkle:nth-of-type(2) {
		top: 50%;
		left: 55%;
	}

	#fifth-gen .num-wrapper .sparkle:last-of-type {
		top: 5%;
		left: 12%;
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

	#third-gen .years {
		background: #FFA9FF;
		color: #000000;
	}

	#fourth-gen .years {
		background: rgba(255,255,255,0.8) !important;
		color: #000000;
	}

	#fifth-gen .years {
		background: rgba(255,255,255,0.8) !important;
		color: #000000;
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

	@media (prefers-reduced-motion: reduce) {
		.num-wrapper .num, 
		.num-wrapper .sparkle {
			opacity: 1 !important;
			transform: scale(1) rotate(0deg) !important;
			transition: none !important;
			animation: none !important;
		}

		.num-wrapper {
			transform: rotate(-6deg) !important;
			transition: none !important;
		}

		.num-wrapper.animate .sparkle {
			animation: none !important;
		}
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

		.num-wrapper {
			height: 20vw;
			width: 20vw;
		}

		.num-wrapper .sparkle {
			height: 3vw;
		}
	}

	@media (max-width: 400px) {
		h2 {
			font-size: 48px;
		}
	}
</style>
