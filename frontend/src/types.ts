export type { BtnProps } from './components/Btn';

export type FetchStatus = 'init' | 'fetching' | 'failure' | 'success';

export type GetRequestStatus<S extends string> = `GET_${Uppercase<S>}_${
  | 'INIT'
  | 'FETCHING'
  | 'FAILURE'
  | 'SUCCESS'}`;

export type FetchState<D> = {
  status: 'init' | 'fetching' | 'failure' | 'success';
  error: null | string;
  data: D[];
};

export type FetchFetching<S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    `GET_${Uppercase<S>}_FAILURE` | `GET_${Uppercase<S>}_SUCCESS`
  >;
};

export type FetchFailure<S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    | `GET_${Uppercase<S>}_INIT`
    | `GET_${Uppercase<S>}_FETCHING`
    | `GET_${Uppercase<S>}_SUCCESS`
  >;
  payload: string;
};

export type FetchSuccess<D, S extends string> = {
  type: Exclude<
    GetRequestStatus<S>,
    | `GET_${Uppercase<S>}_INIT`
    | `GET_${Uppercase<S>}_FETCHING`
    | `GET_${Uppercase<S>}_FAILURE`
  >;
  payload: D[];
};

export type FetchAction<D, S extends string> =
  | FetchFetching<S>
  | FetchFailure<S>
  | FetchSuccess<D, S>;

export interface GetFetching<S extends string> {
  (): FetchFetching<S>;
}

export interface GetFailure<S extends string> {
  (payload: string): FetchFailure<S>;
}

export interface GetSuccess<D, S extends string> {
  (payload: D[]): FetchSuccess<D, S>;
}

export type GenericGetRequestStatus =
  | 'INIT'
  | 'FETCHING'
  | 'FAILURE'
  | 'SUCCESS';

export type GenericFetchFetching = {
  type: Exclude<GenericGetRequestStatus, 'FAILURE' | 'SUCCESS'>;
};

export type GenericFetchFailure = {
  type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'SUCCESS'>;
  payload: string;
};

export type GenericFetchSuccess<D> = {
  type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'FAILURE'>;
  payload: D[];
};

export type GenericFetchAction<D> =
  | GenericFetchFetching
  | GenericFetchFailure
  | GenericFetchSuccess<D>;

export interface GenericGetFetching {
  (): GenericFetchFetching;
}

export interface GenericGetFailure {
  (payload: string): GenericFetchFailure;
}

export interface GenericGetSuccess<D> {
  (payload: D[]): GenericFetchSuccess<D>;
}

export type PartialFetchState = {
  status: FetchStatus;
  error: null | string;
};

export type PartialFetchStateAction =
  | { type: 'FETCHING' }
  | { type: 'FAILURE'; payload: string }
  | { type: 'SUCCESS' };
