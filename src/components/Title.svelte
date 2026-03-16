<script>
	import { onMount } from 'svelte';
	import copy from "$data/copy.json";
	import titleSvg from "$svg/k-pop-NEW.svg";
	import growingUpSvg from "$svg/growing-up-with.svg";
	import _ from "lodash";
	import { select, selectAll } from "d3-selection";
	import { easeBounceOut, easeElasticOut, easeCubicOut } from 'd3-ease';
	import { interpolateString } from 'd3-interpolate';
	import 'd3-transition';
	import mostInView from "$actions/mostInView.js";


	onMount(() => {
		let targetLetters = selectAll("#title .img-wrapper .letter");
		let targetBubbles = selectAll("#title .bubble-wrapper .bubble");
		let targetSparkle = selectAll("#title .img-wrapper .sparkle");

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			targetLetters.style("opacity", 1).style("transform", "scale(1)");
			targetBubbles.style("opacity", 1).style("transform", "translate(-50%, -50%) scale(1)");
			targetSparkle.style("opacity", 1).style("transform", "scale(1) rotate(0deg)");
			return; 
		}

		// Initial state for bubbles
		targetBubbles
			.style("opacity", 0)
			.style("transform", "translate(-50%, -50%) scale(0)");

		// Initial state for sparkles
		targetSparkle
			.style("opacity", 0)
			.attr("transform", "scale(0) rotate(-180)");

		// Animate Letters
		targetLetters
			.style("transform-origin", "center") 
			.style("opacity", 0)
			.style("transform", "scale(0)")       
			.transition()
			.duration(1000)
			.delay((d, i) => i * 100)             
			.ease(easeBounceOut)
			.style("opacity", 1)
			.style("transform", "scale(1)")
			.on("end", function(d, i) {
				if (i === targetLetters.size() - 1) {
					animateStars(targetSparkle); 
				}
			});

		targetBubbles
			.transition()
			.duration(800)
			.delay((d, i) => 500 + ((targetBubbles.size() - 1 - i) * 200))
			.ease(easeBounceOut)
			.style("opacity", 1)
			.styleTween("transform", () => 
				interpolateString("translate(-50%, -50%) scale(0)", "translate(-50%, -50%) scale(1)")
			);
	});

	function animateStars(stars) {
		stars
			.style("transform-origin", "center")
			.style("transform-box", "fill-box")
			.style("opacity", 0)
			.attr("transform", "scale(0) rotate(-180)")
			.transition()
			.delay((d, i) => i * 100) // Stagger the stars themselves
			.duration(500)
			.ease(easeCubicOut)
			.style("opacity", 1)
			.attr("transform", "scale(1) rotate(0)")
			.on("end", function() {
				startTwinkle(select(this));
			});
	}

	function startTwinkle(starSelection) {
        starSelection
            .transition()
			.delay((d, i) => i * 500)
            .duration(500 + Math.random() * 1000)
            .style("opacity", 0.4)
            .transition()
			.delay((d, i) => i * 500)
            .duration(500 + Math.random() * 1000)
            .style("opacity", 1)
            .on("end", () => startTwinkle(starSelection));
    }
</script>

<section id="title" use:mostInView={"title"}>
	<h1 class="sr-only">{copy.landing.title}</h1>

	<!-- <div class="svg-wrapper">
		{@html titleSvg}
	</div> -->
	<div class="inset">
		<div class="bubble-wrapper">
			<img class="bubble" alt="text bubbel: with" src="/assets/img/title/with.png" />
			<img class="bubble" alt="text bubble: growing up" src="/assets/img/title/growing-up.png" />
		</div>
		<div class="img-wrapper">
			{#each [0,1,2,3,4] as group, i}
				<div id="group-{i}" class="letter-group">
					<img class="letter" alt="K-POP" src="/assets/img/title/letter{i}.png" />
					<img class="sparkle" alt="star" src="/assets/img/title/Star{i}.png" />
					{#if i == 4}
						<img class="sparkle" alt="star" src="/assets/img/title/Star5.png" />
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="landing">
		<div class="intros">
			{#each ["minji", "eunice"] as name}
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
</section>

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
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin: 0 auto;
	}

	.inset {
		height: 32vw; 
    	max-height: 400px;
		width: 100%;
		max-width: 1000px;
		margin: 5rem auto;
		position: relative;
	}

	.landing {
		height: calc(100svh - 4rem);
		gap: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.svg-wrapper {
		position: relative;
		max-width: 1000px;
		margin: 5rem auto;
	}

	.img-wrapper, .bubble-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.bubble-wrapper {
		position: absolute;
    	top: 0;
		left: 50%;
    	transform: translateX(-50%);
		width: 100%;
		max-width: 1000px; 
		height: 100%;
		z-index: 1002;
		pointer-events: none;
	}

	.bubble {
		position: absolute;
		transform: translate(-50%, -50%);
		height: auto;
	}

	.bubble:first-of-type {
		width: 10%;
		top: 5%;      
		left: 52%;   
	}

	.bubble:last-of-type {
		width: 22%;
		top: 0%;  
		left: 38%;    
	}

	.letter-group {
		flex: 0 0 auto;
		height: 100%; 
		width: auto;       
		object-fit: contain;
		margin: 0 -3vw;
		z-index: 1000;
		box-sizing: border-box;
		position: relative;
	}

	#group-1 {
		margin: 0 -3vw 0 -5vw;
		z-index: 999;
	}

	#group-3 .letter {
		z-index: 999;
	}

	.letter {
		height: 100%;
	}

	.sparkle {
		position: absolute;
		width: 3vw;
		filter: blur(1px);
	}

	#group-0 .sparkle {
		top: 11.5%;
		left: 4%;
	}

	#group-1 .sparkle {
		top: 33%;
		left: 40%;
	}

	#group-2 .sparkle {
		top: 60%;
		left: 62%;
	}

	#group-3 .sparkle {
		top: 8%;
		left: 45%;
	}

	#group-4 .sparkle {
		top: 80%;
		left: 5%;
	}

	#group-4 .sparkle:last-of-type {
		top: 28%;
		left: 78%;
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
		margin: 0 auto;
		text-align: center;
		font-size: var(--18px);
	}

	.byline {
		text-align: center;
		font-size: var(--18px);
		margin-bottom: 3rem;
	}

	:global(#title svg#growing-up-with) {
		position: absolute;
		width: 35%;
		min-width: 200px;
		left: 24%;
		top: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		*, ::before, ::after {
			animation-delay: -1ms !important;
			animation-duration: 1ms !important;
			animation-iteration-count: 1 !important;
			background-attachment: initial !important;
			scroll-behavior: auto !important;
			transition-duration: 0s !important;
			transition-delay: 0s !important;
		}
	}

	@media (max-width: 600px) {
		:global(#title svg#growing-up-with) {
			transform: translate(0, -20%);
		}

		.img {
			height: 120px;
			width: 120px;
		}

		.context {
			font-size: var(--16px);
		}
	}

	@media (max-width: 400px) {
		:global(#title svg#growing-up-with) {
			transform: translate(-20%, -40%);
		}

		.byline {
			font-size: var(--14px);
			margin-bottom: 0;
		}
	}
</style>
