import { Guess, Hints, Letter } from './types';

/** base game */
export function wordle(answer: Guess, guess: Guess): Hints {
	const output: Hints = ['B', 'B', 'B', 'B', 'B'];

	// prettier-ignore
	const contains: { [key in Letter]: number } = {
		a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0,
	};

	// green pass
	for (let i = 0; i < answer.length; i++) {
		const letter = answer[i];
		const guessed = guess[i];

		if (letter === guessed) output[i] = 'G';
		else contains[letter]++;
	}

	// yellow pass
	for (let i = 0; i < answer.length; i++) {
		const letter = answer[i];
		const guessed = guess[i];

		if (letter === guessed) continue;

		if (contains[guessed] > 0) {
			output[i] = 'Y';
			contains[guessed]--;
		}
	}

	return output;
}

export default wordle;
