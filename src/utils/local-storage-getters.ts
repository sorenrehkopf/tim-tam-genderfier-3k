import { defaultLabelOps, enabledStorageKey, labelOpsStorageKey } from '../consts';

export const getLabelOps = (): string[][] => {
	const localStoragePairs: string = localStorage.getItem(labelOpsStorageKey);

	if (!localStoragePairs) {
		localStorage.setItem(labelOpsStorageKey, JSON.stringify(defaultLabelOps))

		return defaultLabelOps
	}

	return JSON.parse(localStoragePairs);
};

export const getEnabled = async (): Promise<boolean> => {
	return new Promise(resolve => {
		chrome.storage.sync.get([enabledStorageKey], result => {
			const enabledValue: boolean = result[enabledStorageKey];

			resolve(enabledValue !== false);
		});
	})
};
