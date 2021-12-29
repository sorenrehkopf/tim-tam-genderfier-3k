// import labelOps from '../src/label-ops';
import { decorate } from '../src/decorator';

const constructMockItem = () => {
	const item = document.createElement('div');
	const percent = document.createElement('span');
	const label = document.createElement('span');

	item.classList.add('item')
	item.appendChild(percent);
	item.appendChild(label);

	return item
};

const mockTarget = document.createElement('div');
const mockChartPieInfo = document.createElement('div');
const item1 = constructMockItem();
const item2 = constructMockItem();
mockChartPieInfo.classList.add('chart-pie-info');
mockChartPieInfo.appendChild(item1);
mockChartPieInfo.appendChild(item2);
mockTarget.appendChild(mockChartPieInfo);

const mockLabelOps = ['mockOp1', 'mockOp2'];

jest.mock('../src/label-ops', () => ({
	__esModule: true,
	default:['mockOp1', 'mockOp2']
}));

beforeEach(() => {
	// item2.innerText = '';
	// item2.innerText = '';
	console.log('in the test', mockTarget.innerHTML)
	decorate(mockTarget);
});

it('replaces the text for the first item with the first labelOP', () => {
	expect(item1.innerText).toEqual(mockLabelOps[0]);
});

it('replaces the text for the second item with the second labelOP', () => {
	expect(item2.innerText).toEqual(mockLabelOps[1]);
});
