import { useEffect, useReducer } from 'react';

type State<D> = {
  error: null | string;
  status: 'init' | 'fetching' | 'success' | 'failure';
  data: D[];
};

type Action<D> =
  | { type: 'FETCH' }
  | { type: 'FAILURE'; payload: string }
  | { type: 'SUCCESS'; payload: D[] };

export function useFetch<D>(request: string, options?: RequestInit) {
  const initialState: State<D> = {
    error: null,
    status: 'init',
    data: [],
  };

  const reducer = (state: State<D>, action: Action<D>): State<D> => {
    switch (action.type) {
      case 'FETCH':
        return { error: null, status: 'fetching', data: [] };
      case 'FAILURE':
        return { error: action.payload, status: 'failure', data: [] };
      case 'SUCCESS':
        return { error: null, status: 'success', data: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: 'FETCH' });
        const response = await fetch(request, options);
        dispatch({ type: 'SUCCESS', payload: await response?.json() });
      } catch (error: any) {
        dispatch({ type: 'FAILURE', payload: error.message });
      }
    })();
  }, [request]);

  return state;
}

export default useFetch;
