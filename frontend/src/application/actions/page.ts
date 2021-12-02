export const incrementPage = () =>
  ({
    type: 'INCREMENT_PAGE',
  } as const);

export const resetPage = () =>
  ({
    type: 'RESET_PAGE',
  } as const);

export type PageAction =
  | ReturnType<typeof incrementPage>
  | ReturnType<typeof resetPage>;
