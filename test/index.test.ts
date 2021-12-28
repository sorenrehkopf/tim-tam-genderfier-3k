import { decorate } from '../src/decorator';

const mutationObserverDisconnectMock = jest.fn();

class MutationObserverMock extends MutationObserver {
	disconnect(): void {
		mutationObserverDisconnectMock();
	}
}

jest.mock(
	'../src/inspector',
	() => {
		const mockFindGenderContainer = jest.fn()
			.mockReturnValueOnce(null)
			.mockReturnValueOnce(null)
			.mockReturnValueOnce(document.createElement('div'))
			.mockReturnValueOnce(document.createElement('div'))

		return {
			__esModule: true,
			findGenderContainer: mockFindGenderContainer
		}
	}
)
jest.mock('../src/decorator')

let watchForGenderContainer : () => void;

beforeAll(async () => {
	window.MutationObserver = MutationObserverMock;
	const index = await import('../src/index')
	watchForGenderContainer = index.watchForGenderContainer;
})

describe('when the gender container is not found', () => {
	beforeEach(() => {
		watchForGenderContainer();
	});

	it('does not decorate', () => {
		expect(decorate).not.toHaveBeenCalled()
	});

	it('disconnects the initial observer', () => {
		expect(mutationObserverDisconnectMock).not.toHaveBeenCalled()
	});
});

describe('when the gender container is found', () => {
	beforeEach(() => {
		mutationObserverDisconnectMock.mockClear()
		watchForGenderContainer();
	});

	it('decorates', () => {
		expect(decorate).toHaveBeenCalled()
	});

	it('disconnects the initial observer', () => {
		expect(mutationObserverDisconnectMock).toHaveBeenCalled()
	});
});
