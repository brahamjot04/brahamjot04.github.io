// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

Object.defineProperty(window, 'scrollTo', {
	value: jest.fn(),
	writable: true,
});

jest.mock('react-tsparticles', () => ({
	__esModule: true,
	default: () => null,
}));

jest.mock('react-pdf', () => ({
	Document: ({ children }) => children,
	Page: () => null,
	pdfjs: { version: 'mock', GlobalWorkerOptions: { workerSrc: '' } },
}));
