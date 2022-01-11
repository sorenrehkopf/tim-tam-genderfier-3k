import * as React from 'react';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import App, { AppState } from '../../src/popup/App';

configure({ adapter: new Adapter() });

let component: ShallowWrapper<{}, {}, App>;

describe('#removeLabelOp', () => {
	beforeEach(() => {
		component = shallow(<App />);
	});

	it('removes the targeted op', () => {
		const [targetOp] = component.state('labelOps');

		component.instance().removeLabelOp(targetOp);

		expect(component.state('labelOps')).not.toContain(targetOp);
	})
});
