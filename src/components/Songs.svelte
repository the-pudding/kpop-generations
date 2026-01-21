<script>
	import useWindowDimensions from "$runes/useWindowDimensions.svelte.js";
	let dimensions = new useWindowDimensions();

	let { songs } = $props();

	let nodeLocations = $state({});

	const findNodeLocations = () => {
		songs.forEach((song) => {
			const el = document.getElementById(song.nodeId);
			const y = el.getBoundingClientRect().top + el.offsetHeight / 2;
			nodeLocations[song.nodeId] = y;
		});
	};

	$effect(() => findNodeLocations(songs, dimensions.width));
</script>

{#each songs as { artist, title, nodeId }}
	<div class="song">
		<div class="artist">{artist}</div>
		<div class="title">{title}</div>
	</div>
{/each}

<style>
	.song {
		background: var(--song-bg);
		top: 15%;
		position: fixed;
		width: 150px;
		padding: 1rem;
		border: var(--border-style);
		border-radius: var(--border-radius);
	}
</style>
