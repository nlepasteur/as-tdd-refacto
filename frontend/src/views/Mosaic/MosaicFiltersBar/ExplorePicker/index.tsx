// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStoreV2 } from './withMappedStoreV2';
import type { InjectedProps as PropsFromWithHandleClick } from './withSetter';
// libs
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// utils
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';
// components
import withMappedStore, { connector } from './withMappedStore';
import withHandleClick from './withSetter';
import Btn from 'components/Btn';
// style
import './ExplorePicker.css';

type InjectedProps = PropsFromWithHandleClick;

export const Explores: ComponentType<InjectedProps> = ({
  isLogged,
  currentExplore,
  handleExploreClick,
}) => (
  <ul className="explore-list">
    {(['community', 'trending', 'latest', 'following'] as const)
      .filter((explore) => !(!isLogged && explore === 'following'))
      .map((explore) => (
        <li
          key={nanoid()}
          className={classnames(
            'explore-list__item',
            currentExplore === explore && 'explore-list__item--active'
          )}
        >
          <Btn
            onClick={() => handleExploreClick(explore)}
            className="explore-btn"
          >
            {{
              text: explore,
            }}
          </Btn>
        </li>
      ))}
  </ul>
);

type InjectedPropsV2 = PropsFromWithMappedStoreV2;

const ExploresV2: ComponentType<InjectedPropsV2> = ({
  isLogged,
  currentExplore,
  currentDimension,
}) => (
  <ul>
    {(['community', 'trending', 'latest', 'following'] as const)
      .filter((explore) => !(!isLogged && explore === 'following'))
      .map((explore) => (
        <li
          key={nanoid()}
          className={classnames(
            'explore-list__item',
            currentExplore === explore && 'explore-list__item--active'
          )}
        >
          <Link
            to={createExploreDimensionPathname({
              explore,
              dimension: currentDimension,
            })}
          >
            {explore}
          </Link>
        </li>
      ))}
  </ul>
);

export default connector(withMappedStore(withHandleClick(Explores)));
// export default connectorV2(withMappedStoreV2(ExploresV2));
