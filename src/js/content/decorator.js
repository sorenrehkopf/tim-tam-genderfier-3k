import { findOpElement } from './inspector';

export const decorate = target => {
	const genderNames = ['enby', 'unknown'];
	const opTemplate = findOpElement(target);

	if (!!opTemplate) {
		genderNames.forEach(name => {
			const newOp = opTemplate.cloneNode();

			newOp.innerText = name;

			target.insertBefore(newOp, opTemplate);
		});
	};
};
