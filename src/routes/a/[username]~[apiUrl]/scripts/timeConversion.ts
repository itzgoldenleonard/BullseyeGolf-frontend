export function toISOTs(timestamp: number): string {
	let date = new Date(timestamp * 1000);
	let y = String(date.getFullYear());
	let m = String(date.getMonth() + 1).padStart(2, '0');
	let d = String(date.getDate()).padStart(2, '0');
	let h = String(date.getHours()).padStart(2, '0');
	let min = String(date.getMinutes()).padStart(2, '0');
	return `${y}-${m}-${d}T${h}:${min}`;
}

export function toUNIXTs(timestamp: string): number {
	let date = new Date(timestamp);
	return Math.floor(date.getTime() / 1000);
}

export function toLocaleTs(timestamp: number): string {
	let date = new Date(timestamp * 1000);
	return date.toLocaleString();
}
