import { clearAlert, tokenCache } from '../src/util';
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

describe('clearAlert', () => {
  it('should clear alert message after 3 seconds', () => {
    jest.useFakeTimers();
    const setAlertMessageExample = jest.fn();
    clearAlert(setAlertMessageExample);
    jest.advanceTimersByTime(3000);
    expect(setAlertMessageExample).toHaveBeenCalledWith('');
  });
});
