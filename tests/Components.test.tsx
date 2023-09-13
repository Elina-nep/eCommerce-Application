import { render } from '@testing-library/react';

import LoadingSpinner from '../src/components/loading/LoadingSpinner';
import { tokenCache } from '../src/util';

describe('LoadingSpinner', () => {
  it('renders without errors', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });
  it('should render 8 balls', () => {
    const { container } = render(<LoadingSpinner />);
    const ball = container.querySelectorAll('[class^="ball-"]');
    expect(ball).toHaveLength(8);
  });
});

const localStorageExample = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
describe('tokenCache', () => {
  beforeEach(() => {
    localStorageExample.getItem.mockClear();
    localStorageExample.setItem.mockClear();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageExample,
    });
  });

  it('should get token correctly from localStorage', () => {
    const exampleToken = { token: 'exampleToken' };
    localStorageExample.getItem.mockReturnValueOnce(
      JSON.stringify(exampleToken),
    );
    const result = tokenCache.get();
    expect(localStorageExample.getItem).toHaveBeenCalledWith('token');
    expect(result).toEqual(exampleToken);
  });

  it('should set token correctly in localStorage', () => {
    const exampleToken = { token: 'exampleToken', expirationTime: 0 };
    tokenCache.set(exampleToken);
    expect(localStorageExample.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify(exampleToken),
    );
  });

  it('should return null if token is not found in localStorage', () => {
    localStorageExample.getItem.mockReturnValueOnce(null);
    const result = tokenCache.get();
    expect(localStorageExample.getItem).toHaveBeenCalledWith('token');
    expect(result).toBeNull();
  });
});
