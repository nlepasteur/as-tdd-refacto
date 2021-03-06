// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStoreV2 } from './withMappedStoreV2';
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
// libs
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// utils
import createClasses from 'utils/createClasses';
import createExploreDimensionPathname from 'utils/createExploreDimensionPathname';
// components
import withMappedStoreV2, {
  connector as connectorV2,
} from './withMappedStoreV2';
import Btn from 'components/Btn';
import withSetter from './withSetter';
// style
import './DimensionPicker.css';

type InjectedProps = PropsFromWithSetter;

export const DimensionBtns: ComponentType<InjectedProps> = ({
  currentDimension,
  handleDimensionClick,
  children,
  ...props
}) => (
  <ul
    className={classnames(
      'dimension-list',
      createClasses({ ...props }, 'dimension-list--')
    )}
  >
    {(['all', '2d', '3d'] as const).map((dimension) => (
      <li
        key={nanoid()}
        className={classnames(
          'dimension-list__item',
          currentDimension === dimension && 'dimension-list__item--active'
        )}
      >
        <Btn onClick={() => handleDimensionClick(dimension)}>
          {{
            text: dimension,
          }}
        </Btn>
      </li>
    ))}
  </ul>
);

type InjectedPropsV2 = PropsFromWithMappedStoreV2;

const DimensionBtnsV2: ComponentType<InjectedPropsV2> = ({
  currentDimension,
  currentExplore,
}) => (
  <ul>
    {(['all', '2d', '3d'] as const).map((dimension) => (
      <li
        key={nanoid()}
        className={classnames(dimension === currentDimension && 'active')}
      >
        <Link
          to={createExploreDimensionPathname({
            explore: currentExplore,
            dimension,
          })}
        >
          {dimension}
        </Link>
      </li>
    ))}
  </ul>
);

export default connectorV2(withMappedStoreV2(withSetter(DimensionBtns)));
