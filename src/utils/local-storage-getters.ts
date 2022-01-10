import { defaultLabelOps, enabledStorageKey, labelOpsStorageKey } from '../consts';

export const getLabelOps = () : string[][] => {
	const localStoragePairs: string = localStorage.getItem(labelOpsStorageKey);

	if (!localStoragePairs) {
		localStorage.setItem(labelOpsStorageKey, JSON.stringify(defaultLabelOps))

		return defaultLabelOps
	}

	return JSON.parse(localStoragePairs);
};

export const getEnabled = () : boolean => {
	const enabledValue: string = localStorage.getItem(enabledStorageKey);

	return enabledValue !== 'false';
};
