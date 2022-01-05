export const labelOpsStorageKey: string = 'ttg3LabelPairs';

export const defaultLabelOps:string[][] = [
	['Gender is a construct', 'Hail Satan'],
	['Be Gay', 'Do Crime'],
	['Not a phase', 'MOM'],
	['Humans', 'Also Humans'],
	['Chemical', 'Romance'],
];

export const getLabelOps = () : string[][] => {
	const localStoragePairs: string = localStorage.getItem(labelOpsStorageKey);

	if (!localStoragePairs) {
		localStorage.setItem(labelOpsStorageKey, JSON.stringify(defaultLabelOps))

		return defaultLabelOps
	}

	return JSON.parse(localStoragePairs);
};
