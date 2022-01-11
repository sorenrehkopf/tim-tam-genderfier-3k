import { defaultLabelOps, enabledStorageKey, labelOpsStorageKey } from '../../src/consts';
import { getEnabled, getLabelOps } from '../../src/utils/local-storage-getters';

const storageSetSpy: jest.SpyInstance = jest.spyOn(chrome.storage.sync, 'set');

beforeEach(() => {
	storageSetSpy.mockReset();
});

describe('getLabelOps', () => {
	describe('when there are no ops stored already', () => {
		it('sets the local ops in local storage', async () => {
			localStorage.removeItem(labelOpsStorageKey);
			await getLabelOps();
			expect(storageSetSpy).toHaveBeenCalledWith({
				[labelOpsStorageKey]: defaultLabelOps
			});
		});

		it('returns the default ops', async () => {
			expect(await getLabelOps()).toEqual(defaultLabelOps);
		});
	});

	describe('when there are ops stored already', () => {
		const storedOps = [['woah', 'heay'], ['helo', 'heeeey']];

		beforeEach(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({
				[labelOpsStorageKey]: storedOps
			});
		});

		afterAll(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({})
		})

		it('returns the stored ops', async () => {
			expect(await getLabelOps()).toEqual(storedOps);
		});
	});
});

describe('getEnabled', () => {
	describe('when there is no value stored already', () => {
		it('returns true', async () => {
			expect(await getEnabled()).toEqual(true);
		});
	});

	describe('when the stored value is true', () => {
		beforeEach(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({
				[enabledStorageKey]: true
			});
		});

		afterAll(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({})
		})

		it('returns true', async () => {
			expect(await getEnabled()).toEqual(true);
		});
	});

	describe('when the stored value is "false"', () => {
		beforeEach(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({
				[enabledStorageKey]: false
			});
		});

		afterAll(() => {
			(chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({})
		})

		it('returns false', async () => {
			expect(await getEnabled()).toEqual(false);
		});
	});
});
