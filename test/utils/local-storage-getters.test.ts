import { defaultLabelOps, enabledStorageKey, labelOpsStorageKey } from '../../src/consts';
import { getEnabled, getLabelOps } from '../../src/utils/local-storage-getters';

describe('getLabelOps', () => {
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
});

describe('getEnabled', () => {
	describe('when there is no value stored already', () => {
		beforeEach(() => {
			localStorage.removeItem(enabledStorageKey);
		});

		it('returns true', () => {
			expect(getEnabled()).toEqual(true);
		});
	});

	describe('when the stored value is "true"', () => {
		beforeEach(() => {
			localStorage.setItem(enabledStorageKey, 'true');
		});

		it('returns true', () => {
			expect(getEnabled()).toEqual(true);
		});
	});

	describe('when the stored value is "false"', () => {
		beforeEach(() => {
			localStorage.setItem(enabledStorageKey, 'false');
		});

		it('returns false', () => {
			expect(getEnabled()).toEqual(false);
		});
	});
});
