// libs
import { act, renderHook } from '@testing-library/react-hooks';
// tested hook
import { useFetch } from 'hooks/useFetch';

describe('useFetch', () => {
  it('returns an object with "error", "status", "data", properties', () => {
    const expected = ['error', 'status', 'data'];
    const { result } = renderHook(() => useFetch('/some/endpoint'));
    expect(
      Object.keys(result.current).every((key) => expected.includes(key))
    ).toEqual(true);
  });

  it('fetches data with url provided as first argument', async () => {
    const expected = '/some/endpoint';
    global.fetch = jest.fn();
    await act(async () => {
      renderHook(() => useFetch(expected));
    });
    expect(global.fetch).toBeCalledWith(expected, undefined);
  });

  describe('while fetching data', () => {
    it('translates pending promise then resolved promise into state correctly', async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        Promise.resolve({
          json: () => Promise.resolve(),
        });
      });
      const { result, waitForNextUpdate } = renderHook(() => useFetch('/'));
      expect(result.current.status).toBe('fetching');
      await waitForNextUpdate();
      expect(result.current.status).toBe('success');
    });

    it('translates pending promise then rejected promise into state correctly', async () => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.reject({
          message: '',
        })
      );
      const { result, waitForNextUpdate } = renderHook(() => useFetch('/'));
      expect(result.current.status).toBe('fetching');
      await waitForNextUpdate();
      expect(result.current.status).toBe('failure');
    });
  });
});
