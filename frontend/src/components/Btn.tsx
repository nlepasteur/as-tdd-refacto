import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type Props<C extends ElementType> = {
  children: {
    text: ReactNode;
    sibling?: ReactNode;
  };
  as?: C;
};

export type BtnProps<C extends ElementType> = Props<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>;

const Btn = <C extends ElementType = 'button'>({
  children: { text, sibling },
  as,
  ...attributes
}: BtnProps<C>) => {
  const Element = as || 'button';
  return (
    <Element {...attributes}>
      {text}
      {sibling}
    </Element>
  );
};

export default Btn;
