import { findGenderContainer } from './inspector.js';
import { decorate } from './decorator.js';


const watchForGenderContainer = () => {
	const genderContainer = findGenderContainer();

	if (genderContainer) {
		initialObserver.disconnect();
		decorate(genderContainer);
	}
}

const initialObserver = new MutationObserver(watchForGenderContainer);

initialObserver.observe(document.body, { childList: true })
