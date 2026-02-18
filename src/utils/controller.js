import { current } from "$runes/misc.svelte.js";

const sections = new Map();

let rafScheduled = false;

export function register(id, getRatio) {
	sections.set(id, getRatio);
}

export function unregister(id) {
	sections.delete(id);
}

export function scheduleEvaluate() {
	if (rafScheduled) return;

	rafScheduled = true;

	requestAnimationFrame(() => {
		rafScheduled = false;
		evaluate();
	});
}

function evaluate() {
	let maxId = null;
	let maxRatio = 0;

	for (const [id, getRatio] of sections.entries()) {
		const ratio = getRatio();
		if (ratio > maxRatio) {
			maxRatio = ratio;
			maxId = id;
		}
	}

	current.section = maxId ?? undefined;
}
