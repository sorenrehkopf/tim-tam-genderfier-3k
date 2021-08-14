import { findGenderElement } from './inspector.js';
import { decorate } from './decorator.js';


let initialized = false;

const init = () => {
	if (!initialized) {
		const target = findGenderElement();

		if (target) {
			decorate(target);

			initialized = true;
		}
	}
};

document.addEventListener('DOMContentLoaded', init);
init();
