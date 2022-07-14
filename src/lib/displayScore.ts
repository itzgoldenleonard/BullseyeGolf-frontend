export function displayScore(input: number | null): string {
	let output = String(input).replace('.', ',');
	try {
		let digits = output.split(',')[1].length;
		if (digits == 1) output += '0';
		if (digits > 2) output = output.split(',')[0] + ',' + output.split(',')[1].slice(0, 2);
	} catch (e) {
		output += ',00';
	}
	return output;
}
