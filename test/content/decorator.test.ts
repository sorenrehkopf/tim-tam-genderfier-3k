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

jest.mock('../../src/utils/get-label-ops', () => ({
	__esModule: true,
	default: () => ([['mockOp1', 'mockOp2']])
}));

beforeAll(() => {
	label1.innerText = "";
	label2.innerText = "";
	decorate(mockTarget);
})


it('replaces the text for the first item with the first labelOP', () => {
	expect(label1.innerText).toEqual(mockLabelOps[0])
});

it('replaces the text for the second item with the second labelOP', () => {
	expect(label2.innerText).toEqual(mockLabelOps[1])
});
