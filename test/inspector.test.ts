import { findGenderContainer } from '../src/inspector';

describe('when the iframe is not present', () => {
	it('returns null', () => {
		expect(findGenderContainer()).toEqual(null);
	})
});

describe('when the iframe is present but not the gender container', () => {
	beforeAll(() => {
		const iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
	});

	it('returns null', () => {
		expect(findGenderContainer()).toEqual(null);
	});
});

describe('when the iframe and the gender container are both present', () => {
	const genderContainer = document.createElement('div');

	beforeAll(() => {
		const iframe = document.createElement('iframe');
		document.body.appendChild(iframe);

		const frameDoc:Document = document.querySelector('iframe').contentWindow.document;
		const topLevelContainer = document.createElement('div');
		topLevelContainer.classList.add('gender-territories-container')
		topLevelContainer.appendChild(genderContainer);
		frameDoc.body.appendChild(topLevelContainer);
	});

	it('returns the gender container', () => {
		expect(findGenderContainer()).toBe(genderContainer);
	});
});
