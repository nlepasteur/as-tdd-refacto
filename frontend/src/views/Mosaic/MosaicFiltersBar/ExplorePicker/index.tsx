// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithHandleClick } from './withSetter';
// libs
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// components
import withMappedStore, { connector } from './withMappedStore';
import withHandleClick from './withSetter';
import Btn from 'components/Btn';

type InjectedProps = PropsFromWithHandleClick;

export const Explores: ComponentType<InjectedProps> = ({
  isLogged,
  currentExplore,
  setExplore,
}) => (
  <ul>
    {(['community', 'trending', 'latest', 'following'] as const)
      .filter((explore) => !(!isLogged && explore === 'following'))
      .map((explore) => (
        <li key={nanoid()}>
          <Btn
            onClick={() => setExplore(explore)}
            className={classnames(explore === currentExplore && 'active')}
          >
            {{
              text: explore,
            }}
          </Btn>
        </li>
      ))}
  </ul>
);

export default connector(withMappedStore(withHandleClick(Explores)));
