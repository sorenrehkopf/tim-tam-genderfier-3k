import { findGenderContainer } from './inspector';
import { decorate } from './decorator';

const watchForGenderContainer = () => {
	const genderContainer:HTMLElement = findGenderContainer();

	if (genderContainer) {
		initialObserver.disconnect();
		decorate(genderContainer);
	}
}

const initialObserver:MutationObserver = new MutationObserver(watchForGenderContainer);

initialObserver.observe(document.body, { childList: true })
