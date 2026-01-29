<script>
	import _ from "lodash";
	import playSvg from "$svg/play-circle.svg";
	import pauseSvg from "$svg/pause-circle.svg";
	import inView from "$actions/inView.js";

	let { artist, title, id } = $props();

	let audioEl = $state();
	let paused = $state(true);

	const onClick = () => {
		if (paused) {
			audioEl.play();

			const audios = document.querySelectorAll("audio");
			audios.forEach((audio) => {
				if (audio !== audioEl && !audio.paused) {
					audio.pause();
				}
			});
		} else {
			audioEl.pause();
		}
	};
</script>

<div
	class="song"
	use:inView
	onexit={() => {
		if (!paused) {
			audioEl.pause();
		}
	}}
>
	<div class="cover-art">
		{#if id}
			<img
				src={`assets/img/songs/${id}.jpg`}
				alt={`Cover art for ${title} by ${artist}`}
			/>
			<audio bind:this={audioEl} src={`assets/audio/${id}.m4a`} bind:paused
			></audio>
			<button class="playpause" onclick={onClick}>
				{#if paused}
					{@html playSvg}
				{:else}
					{@html pauseSvg}
				{/if}
			</button>
		{/if}
	</div>

	<div class="player">
		<div class="artist">{artist}</div>
		<div class="title">"{title}"</div>
	</div>
</div>

<style>
	.song {
		display: flex;
		width: 300px;
		gap: 0.5rem;
		background: var(--song-bg, var(--text-bg));
		color: var(--text-color);
		padding: 1rem;
		border: 2px solid var(--border);
		box-shadow: var(--box-shadow);
		border-radius: var(--border-radius);
		transform: translate(0, 30%);
	}

	.cover-art {
		position: relative;
		height: 100px;
		aspect-ratio: 1 / 1;
	}

	.cover-art img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.artist {
		font-weight: bold;
	}

	button.playpause {
		position: absolute;
		height: 50px;
		width: 50px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 0;
		padding: 0;
		background: none;
		color: var(--color-bg);
	}

	:global(
		button.playpause svg circle,
		button.playpause svg line,
		button.playpause svg polygon
	) {
		transition:
			fill calc(var(--1s) * 0.2),
			stroke calc(var(--1s) * 0.2);
	}

	:global(button.playpause:hover svg circle, button.playpause:hover svg line) {
		stroke: var(--color-gray-200);
	}

	:global(button.playpause:hover svg polygon) {
		stroke: var(--color-gray-200);
		fill: var(--color-gray-200);
	}
</style>
