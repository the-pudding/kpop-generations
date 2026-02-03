async function getApplePreview(track, artist) {
	const term = encodeURIComponent(`${track} ${artist}`);
	const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1`;

	const res = await fetch(url);
	const data = await res.json();

	if (!data.results.length) return null;

	return {
		previewUrl: data.results[0].previewUrl,
		artwork: data.results[0].artworkUrl100
	};
}

const songs = [
	// { track: "No.1", artist: "BoA" },
	// { track: "I Know (Club Mix)", artist: "Seotaiji and Boys" },
	// { track: "U", artist: "Super Junior" },
	{ track: "Lies", artist: "Big Bang" },
	{ track: "Replay", artist: "SHINee" },
	{ track: "Growl", artist: "EXO" },
	{ track: "TT", artist: "TWICE" },
	{ track: "DNA", artist: "BTS" },
	{ track: "Dynamite", artist: "BTS" },
	{ track: "How You Like That", artist: "BLACKPINK" },
	{ track: "Golden", artist: "HUNTR/X" },
	{ track: "Magnetic", artist: "ILLIT" }
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
