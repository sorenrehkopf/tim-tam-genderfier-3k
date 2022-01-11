import { defaultLabelOps, enabledStorageKey, labelOpsStorageKey } from '../consts';

export const getLabelOps = async (): Promise<string[][]> => {
	return new Promise(resolve => {
		chrome.storage.sync.get([labelOpsStorageKey], result => {
			const storagePairs: string[][] = result[labelOpsStorageKey];

			if (!storagePairs) {
				chrome.storage.sync.set({
					[labelOpsStorageKey]: defaultLabelOps
				});

				resolve(defaultLabelOps)
			} else {
				resolve(storagePairs)
			}
		});
	})
};

export const getEnabled = async (): Promise<boolean> => {
	return new Promise(resolve => {
		chrome.storage.sync.get([enabledStorageKey], result => {
			const enabledValue: boolean = result[enabledStorageKey];

			resolve(enabledValue !== false);
		});
	})
};
