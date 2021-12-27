import { JSDOM } from 'jsdom';

const mockDOM = new JSDOM();

export default () => {
	global.MutationObserver = mockDOM.MutationObserver;
}
