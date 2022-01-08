import { defaultLabelOps, labelOpsStorageKey } from '../consts';

const getLabelOps = () : string[][] => {
	const localStoragePairs: string = localStorage.getItem(labelOpsStorageKey);

	if (!localStoragePairs) {
		localStorage.setItem(labelOpsStorageKey, JSON.stringify(defaultLabelOps))

		return defaultLabelOps
	}

	return JSON.parse(localStoragePairs);
};

export default getLabelOps;
