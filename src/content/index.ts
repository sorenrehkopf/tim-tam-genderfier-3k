import { enabledStorageKey } from '../consts';
import { findGenderContainer } from './inspector';
import { decorate } from './decorator';

export const watchForGenderContainer = ():void => {
	const genderContainer:HTMLElement = findGenderContainer();

	if (genderContainer) {
		initialObserver.disconnect();
		decorate(genderContainer);
	}
}

const initialObserver:MutationObserver = new MutationObserver(watchForGenderContainer);

const enabled: boolean = localStorage.getItem(enabledStorageKey) !== 'false';

if (enabled) {
	initialObserver.observe(document.body, { childList: true })
};
