const isLogged = () =>
  ({
    type: 'IS_LOGGED',
  } as const);

export type IsLoggedAction = ReturnType<typeof isLogged>;
