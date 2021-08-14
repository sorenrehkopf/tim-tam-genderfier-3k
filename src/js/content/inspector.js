export const findGenderElement = () => {
	const el = document.querySelector('[name="Gender"]');

	return el;
}

export const findOpElement = genderElement => {
	const el = genderElement.options[genderElement.options.length - 1];

	return el;
}

