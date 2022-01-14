import { decorate } from '../../src/content/decorator';

const constructMockItem = () => {
	const item = document.createElement('div');
	const percent = document.createElement('span');
	const label = document.createElement('span');

	item.classList.add('item')
	item.appendChild(percent);
	item.appendChild(label);

	return [item, label]
};

const mockTarget = document.createElement('div');
const mockChartPieInfo = document.createElement('div');
const [item1, label1] = constructMockItem();
const [item2, label2] = constructMockItem();
mockChartPieInfo.classList.add('chart-pie-info');
mockChartPieInfo.appendChild(item1);
mockChartPieInfo.appendChild(item2);
mockTarget.appendChild(mockChartPieInfo);
document.body.appendChild(mockTarget);

const mockLabelOps = ['mockOp1', 'mockOp2'];

jest.mock('../../src/utils/local-storage-getters', () => ({
	__esModule: true,
	getLabelOps: () => ([['mockOp1', 'mockOp2']])
}));

describe('when the labels are undecorated', () => {
	beforeEach(() => {
		label1.innerText = "Male";
		label2.innerText = "Female";
		decorate(mockTarget);
	})


	it('replaces the text for the first item with the first labelOP', () => {
		expect(label1.innerText).toEqual(mockLabelOps[0])
	});

	it('replaces the text for the second item with the second labelOP', () => {
		expect(label2.innerText).toEqual(mockLabelOps[1])
	});
});

describe('when the labels are decorated', () => {
	const decoratedText: string[] = ["Decorated", "Text"]

	beforeEach(() => {
		label1.innerText = decoratedText[0];
		label2.innerText = decoratedText[1];
		decorate(mockTarget);
	})


	it('does not alter the first label text', () => {
		expect(label1.innerText).toEqual(decoratedText[0])
	});

	it('does not alter the first label text', () => {
		expect(label2.innerText).toEqual(decoratedText[1])
	});
});
