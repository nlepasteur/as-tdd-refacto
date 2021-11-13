// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithHandleClick } from './withHandleClick';
// libs
import { nanoid } from 'nanoid';
// components
import withMappedStore, { connector } from './withMappedStore';
import withHandleClick from './withHandleClick';
import Btn from 'components/Btn';

type InjectedProps = PropsFromWithHandleClick;

export const Explores: ComponentType<InjectedProps> = ({
  isLogged,
  handleClick,
}) => (
  <ul>
    {(['community', 'trending', 'latest', 'following'] as const)
      .filter((explore) => !(!isLogged && explore === 'following'))
      .map((explore) => (
        <li key={nanoid()}>
          <Btn onClick={() => handleClick(explore)}>
            {{
              text: explore,
            }}
          </Btn>
        </li>
      ))}
  </ul>
);

export default connector(withMappedStore(withHandleClick(Explores)));
