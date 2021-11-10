// types
import type { ComponentType } from 'react';
import type { Btn } from 'types';
import type { Explore } from 'application/types';

type InjectedProps = { explore: Explore; handleClick(explore: Explore): void };

const ExploreBtn: ComponentType<
  InjectedProps & Omit<Btn, keyof InjectedProps>
> = ({ explore, handleClick, children: { title }, ...attributes }) => (
  <button onClick={() => handleClick(explore)} {...attributes}>
    {title}
  </button>
);

export default ExploreBtn;
