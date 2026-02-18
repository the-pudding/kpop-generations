import { register, unregister, scheduleEvaluate } from "$utils/controller";

export default function mostInView(node, id) {
	let ratio = 0;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				ratio = entry.intersectionRatio;
			}
			scheduleEvaluate();
		},
		{
			threshold: buildThresholds()
		}
	);

	register(id, () => ratio);

	observer.observe(node);

	return {
		destroy() {
			unregister(id);
			observer.disconnect();
		}
	};
}

function buildThresholds() {
	const thresholds = [];
	for (let i = 0; i <= 100; i++) {
		thresholds.push(i / 100);
	}
	return thresholds;
}
