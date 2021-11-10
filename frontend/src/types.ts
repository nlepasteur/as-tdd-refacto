import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type Btn = ComponentPropsWithoutRef<'button'> & {
  children: {
    title: ReactNode;
    sibling?: ReactNode;
  };
};
