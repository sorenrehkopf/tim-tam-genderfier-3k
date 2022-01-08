import { defaultLabelOps, labelOpsStorageKey } from '../../src/consts';
import getLabelOps from '../../src/utils/get-label-ops';

describe('when there are no ops stored already', () => {
	it('sets the local ops in local storage', () => {
		localStorage.removeItem(labelOpsStorageKey);
		getLabelOps();
		expect(localStorage.getItem(labelOpsStorageKey)).toEqual(JSON.stringify(defaultLabelOps));
	});

	it('returns the default ops', () => {
		expect(getLabelOps()).toEqual(defaultLabelOps);
	});
});

describe('when there are ops stored already', () => {
	const storedOps = [['woah', 'heay'], ['helo', 'heeeey']];

	beforeEach(() => {
		localStorage.setItem(labelOpsStorageKey, JSON.stringify(storedOps));
	});

	it('returns the stored ops', () => {
		expect(getLabelOps()).toEqual(storedOps);
	});
});
