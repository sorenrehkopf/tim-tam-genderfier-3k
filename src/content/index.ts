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

initialObserver.observe(document.body, { childList: true })
