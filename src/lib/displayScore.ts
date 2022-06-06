export function displayScore(input: number): string {
    let output = String(input).replace('.', ',');
    try {
        let digits = output.split(',')[1].length;
        if (digits == 1) output += '0';
    } catch (e) {
        output += ',00';
    }
    return output
}
