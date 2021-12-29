export const findGenderContainer = () : HTMLElement => {
	try {
		const frameDoc:Document = document.querySelector('iframe').contentWindow.document;
		const el:HTMLElement = frameDoc.querySelector('.gender-territories-container>:first-child');

		return el;
	} catch (_error) {
		return null;
	}
}
