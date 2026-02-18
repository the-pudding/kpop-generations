<script>
	import data from "$data/youtube-records.csv";

	let { title } = $props();
</script>

<h3>{@html title}</h3>

<div class="table">
	{#each data as { rank, artist, song, link, views, thumbnail, channel }}
		<a href={link} target="_blank">
			<div class="video">
				<div class="rank">{rank}</div>
				<div
					class="thumbnail"
					style:transform={rank === "10" ? "translate(-9px, 0)" : "none"}
				>
					<img
						src={`assets/img/thumbnails/${thumbnail}.jpg`}
						alt={`YouTube thumbnail for ${song} by ${artist}`}
					/>
				</div>
				<div
					class="info"
					style:transform={rank === "10" ? "translate(-9px, 0)" : "none"}
				>
					<div class="song-name">{artist} - {song}</div>
					<span class="channel">{channel}</span>
					<span class="views">{views} views</span>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	h3 {
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
	}

	.table {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.video {
		height: 100%;
		display: flex;
		gap: 1rem;
		padding: 0.5rem;
		border-bottom: 1px solid var(--text-color);
	}

	.video:hover {
		background: rgba(163, 155, 255, 0.5);
	}

	a {
		text-decoration: none;
	}

	.thumbnail {
		flex: 0 0 100px;
	}

	.thumbnail img {
		width: 100%;
		border: 1px solid var(--text-color);
		border-radius: 4px;
	}

	.song-name,
	.rank {
		font-weight: bold;
		font-size: var(--14px);
	}

	.channel,
	.views {
		font-size: var(--12px);
	}

	.views {
		margin-left: -4px;
	}

	.views::before {
		content: "•";
		color: var(--text-color);
		margin-right: 4px;
	}

	@media (max-width: 600px) {
		.song-name,
		.rank {
			font-size: var(--12px);
		}

		.thumbnail {
			flex: 0 0 50px;
		}
	}
</style>
