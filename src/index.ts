import eliminator from './eliminator';
import { Guess, Hints } from './types';
import { answers } from './words';

const tries: [Guess, Hints][] = [];

for (let i = 2; i < process.argv.length; i = i + 2) {
	const guess = process.argv[i];
	const hints = process.argv[i + 1];

	//  todo: better catching of invalid inputs
	if (hints == undefined || guess.length !== 5 || hints.length !== 5) throw new Error('Invalid input!');

	tries.push([guess.toLowerCase().split('') as Guess, hints.toUpperCase().split('') as Hints]);
}

const possibilities = tries.reduce(eliminator, [...answers]);

console.log(possibilities.join(', '));
