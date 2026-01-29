async function getApplePreview(track, artist) {
	const term = encodeURIComponent(`${track} ${artist}`);
	const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1`;

	const res = await fetch(url);
	const data = await res.json();

	console.log(data.results);

	if (!data.results.length) return null;

	return {
		previewUrl: data.results[0].previewUrl,
		artwork: data.results[0].artworkUrl100
	};
}

const songs = [
	{ track: "No.1", artist: "BoA" },
	{ track: "I Know (Club Mix)", artist: "Seotaiji and Boys" },
	{ track: "U", artist: "Super Junior" }
];

const getPreviews = async () => {
	const previews = {};

	for (const song of songs) {
		const previewUrl = await getApplePreview(song.track, song.artist);
		previews[`${song.artist} - ${song.track}`] = previewUrl;
	}

	console.log(previews);
};

getPreviews();
