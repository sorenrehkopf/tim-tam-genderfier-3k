export const findGenderContainer = () => {
	const frameDoc = document.querySelector('iframe').contentWindow.document;
	const el = frameDoc.querySelector('.gender-territories-container>:first-child');

	return el;
}
