import { expect } from 'chai';
import { Guess } from '../src/types';
import wordle from '../src/wordle';

describe('wordle', function () {
	it('handles duplicates correctly', function () {
		// leftmost 'b' should be yellow
		expect(wordle('xxxbb'.split('') as Guess, 'bbbzb'.split('') as Guess)).to.deep.equal(['Y', 'B', 'B', 'B', 'G']);
		expect(wordle('xxxbb'.split('') as Guess, 'zbbzb'.split('') as Guess)).to.deep.equal(['B', 'Y', 'B', 'B', 'G']);

		expect(wordle('igloo'.split('') as Guess, 'blood'.split('') as Guess)).to.deep.equal(['B', 'Y', 'Y', 'G', 'B']);
	});
});
