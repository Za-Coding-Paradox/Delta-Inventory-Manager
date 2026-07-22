export function deterministicRegion(id: string): string {
	const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = (hash << 5) - hash + id.charCodeAt(i);
		hash |= 0;
	}
	return regions[Math.abs(hash) % regions.length];
}
