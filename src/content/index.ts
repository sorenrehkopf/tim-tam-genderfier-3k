import { enabledStorageKey } from '../consts';
import { findGenderContainer } from './inspector';
import { decorate } from './decorator';
import { getEnabled } from '../utils/local-storage-getters';

export const watchForGenderContainer = (): void => {
	const genderContainer:HTMLElement = findGenderContainer();

	if (genderContainer) {
		decorate(genderContainer);
	}
}

const initialObserver:MutationObserver = new MutationObserver(watchForGenderContainer);

export const init = (): Promise<void> => getEnabled().then(
	(enabled: boolean) => {
		if (enabled) {
			initialObserver.observe(document.body, { childList: true })
		};
	}
);

init();
