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

	// order doesn't matter, this is just to handle duplicates
	// should probably use a map but eh
	let correct: Letter[] = [];

	// first handle green vs not green
	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];
		const hint = hints[i];

		if (hint === 'G') {
			possibilities = possibilities.filter((w) => w[i] === letter);
			correct.push(letter);
		} else {
			possibilities = possibilities.filter((w) => w[i] !== letter);
		}
	}

	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];
		const hint = hints[i];

		if (hint === 'G') continue; // ignore, handled above
		if (hint === 'Y') correct.push(letter);

		// handle duplicates
		const corrects = correct.filter((l) => l === letter).length;

		possibilities = possibilities.filter((w) => {
			const instances = w.split('').filter((l) => l === letter).length;

			if (hint === 'Y') return instances >= corrects;
			return instances === corrects;
		});
	}
}

console.log(possibilities.join(', '));
