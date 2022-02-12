import { answers } from './words';

type Letter =
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z';
type Color = 'G' | 'Y' | 'B'; // green/yellow/black

let possibilities = [...answers];

const guesses: [[Letter, Letter, Letter, Letter, Letter], [Color, Color, Color, Color, Color]][] = [
	// fill in here
	[
		['r', 'a', 'i', 's', 'e'],
		['G', 'B', 'Y', 'B', 'B'],
	],
	[
		['c', 'l', 'o', 'u', 't'],
		['B', 'B', 'Y', 'B', 'B'],
	],
]; // e.g. RAISE, GBYBB

for (const g of guesses) {
	const [guess, hints] = g;

	let correct: Letter[] = []; // order doesn't matter, this is just to handle duplicates

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

		// handle duplicates
		const corrects = correct.filter((l) => l === letter).length;

		possibilities = possibilities.filter((w) => {
			const instances = w.split('').filter((l) => l === letter).length;

			if (hint === 'Y') return instances > corrects;
			else return instances === corrects;
		});
	}
}

console.log(possibilities);
