import * as React from 'react';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import { labelOpsStorageKey, enabledStorageKey } from '../../src/consts';
import App, { AppState } from '../../src/popup/App';

configure({ adapter: new Adapter() });

const storageSetSpy: jest.SpyInstance = jest.spyOn(chrome.storage.sync, 'set');;
let component: ShallowWrapper<{}, {}, App>;

beforeEach(() => {
	component = shallow(<App />);
});

describe('#toggleEnabled', () => {
	beforeEach(async () => {
		storageSetSpy.mockReset();
	});

	it('toggles the enabled value', () => {
		const originalEnabledValue = component.state('enabled');

		component.instance().toggleEnabled();

		expect(component.state('enabled')).not.toEqual(originalEnabledValue);
	});

	it('persists the new value to local storage', () => {
		component.instance().toggleEnabled();
		expect(storageSetSpy).toHaveBeenCalledTimes(1);
		expect(storageSetSpy).toHaveBeenCalledWith({
			[enabledStorageKey]: component.state('enabled')
		});
	});
});

describe('#removeLabelOp', () => {
	beforeEach(() => {
		storageSetSpy.mockReset();
	});

	it('removes the targeted op', () => {
		const [targetOp] = component.state('labelOps');

		component.instance().removeLabelOp(targetOp);
		expect(component.state('labelOps')).not.toContainEqual(targetOp);
	});

	it('persists the new value to localStorage', () => {
		const [targetOp] = component.state('labelOps');

		component.instance().removeLabelOp(targetOp);
		expect(storageSetSpy).toHaveBeenCalledTimes(1);
		expect(storageSetSpy).toHaveBeenCalledWith({
			[labelOpsStorageKey]: component.state('labelOps')
		});
	});
});

describe('#addLabelOp', () => {
	beforeEach(() => {
		storageSetSpy.mockReset();
	});

	describe('when the label op is formatted correctly', () => {
		const newLabel = "the new, label";
		const newLabelOp = newLabel.replace(/\s*,\s*/, ',').split(',');

		beforeEach(() => {
			component.setState({ newLabel });
		});

		it('adds the new op', () => {
			component.find('form').simulate('submit', { preventDefault: jest.fn()});
			expect(component.state('labelOps')).toContainEqual(newLabelOp);
		});

		it('persists the new value to localStorage', () => {
			component.find('form').simulate('submit', { preventDefault: jest.fn()});
			expect(storageSetSpy).toHaveBeenCalledTimes(1);
			expect(storageSetSpy).toHaveBeenCalledWith({
				[labelOpsStorageKey]: component.state('labelOps')
			});
		});

		it('clears out the new value text', () => {
			component.find('form').simulate('submit', { preventDefault: jest.fn()});
			expect(component.state('newLabel')).toEqual('');
		});
	});

	describe('when the label op is not formatted correctly', () => {
		const newLabel = "the new label";

		beforeEach(() => {
			component.setState({ newLabel });
		});

		it('does not add the new op', () => {
			const originalLabelOps = component.state('labelOps');
			component.find('form').simulate('submit', { preventDefault: jest.fn()});
			expect(component.state('labelOps')).toEqual(originalLabelOps)
		});

		it('shows the error', () => {
			component.find('form').simulate('submit', { preventDefault: jest.fn()});
			expect(component.state('showError')).toEqual(true);
		});
	});
});
