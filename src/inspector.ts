export const findGenderContainer = () : HTMLElement => {
	try {
		const frameDoc:Document = document.querySelector('iframe').contentWindow.document;
		console.log('in the code!', frameDoc)
		const el:HTMLElement = frameDoc.querySelector('.gender-territories-container>:first-child');

		return el;
	} catch (_error) {
		return null;
	}
}
