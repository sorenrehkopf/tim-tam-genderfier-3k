import { decorate } from '../../src/content/decorator';
import { getEnabled } from '../../src/utils/local-storage-getters';

const mutationObserverDisconnectMock = jest.fn();
const mutationObserverObserveMock = jest.fn();

class MutationObserverMock extends MutationObserver {
	disconnect(): void {
		mutationObserverDisconnectMock();
	}

	observe(element: any, ops: any): void {
		mutationObserverObserveMock();
	}
}

jest.mock(
	'../../src/content/inspector',
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
jest.mock(
	'../../src/utils/local-storage-getters',
	() => {
		const mockGetEnabled = jest.fn()
			.mockResolvedValueOnce(false)
			.mockResolvedValueOnce(true)
			.mockResolvedValueOnce(false)

		return {
			__esModule: true,
			getEnabled: mockGetEnabled
		}
	}
);
jest.mock('../../src/content/decorator');

let watchForGenderContainer : () => void;
let init : () => void;

beforeAll(async () => {
	window.MutationObserver = MutationObserverMock;
	const index = await import('../../src/content/index')
	watchForGenderContainer = index.watchForGenderContainer;
	init = index.init;
})

describe('watchForGenderContainer', () => {
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
});

describe('init', () => {
	describe('when enabled is true', () => {
		beforeEach(() => {
			mutationObserverObserveMock.mockReset();
		});

		it ('observes the body', async () => {
			await init()
			expect(mutationObserverObserveMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('when enabled is false', () => {
		beforeEach(() => {
			mutationObserverObserveMock.mockReset();
		});

		it ('does not observe the body', async () => {
			await init()
			expect(mutationObserverObserveMock).toHaveBeenCalledTimes(0);
		});
	});
})
