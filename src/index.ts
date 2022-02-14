import { Letter, Color } from './types';
import { answers } from './words';

const guesses: [[Letter, Letter, Letter, Letter, Letter], [Color, Color, Color, Color, Color]][] = [];

for (let i = 2; i < process.argv.length; i = i + 2) {
	const guess = process.argv[i];
	const hints = process.argv[i + 1];

	//  todo: better catching of invalid inputs
	if (hints == undefined || guess.length !== 5 || hints.length !== 5) throw new Error('Invalid input!');

	guesses.push([
		guess.toLowerCase().split('') as [Letter, Letter, Letter, Letter, Letter],
		hints.toUpperCase().split('') as [Color, Color, Color, Color, Color],
	]);
}

let possibilities = [...answers];

for (const g of guesses) {
	const [guess, hints] = g;

	// duplicate handling
	// prettier-ignore
	const contains: { [key in Letter]: number } = {
		a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0,
	};

	// first handle green vs not green
	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];
		const hint = hints[i];

		if (hint === 'G') {
			possibilities = possibilities.filter((w) => w[i] === letter);
			contains[letter]++;
		} else {
			possibilities = possibilities.filter((w) => w[i] !== letter);
		}
	}

	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];
		const hint = hints[i];

		if (hint === 'G') continue; // ignore, handled above
		if (hint === 'Y') contains[letter]++;

		possibilities = possibilities.filter((w) => {
			const instances = w.split('').filter((l) => l === letter).length;

			if (hint === 'Y') return instances >= contains[letter];
			return instances === contains[letter];
		});
	}
}

console.log(possibilities.join(', '));
