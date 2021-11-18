// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
// libs
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// components
import withMappedStore, { connector } from './withMappedStore';
import withSetter from './withSetter';
import Btn from 'components/Btn';

type InjectedProps = PropsFromWithSetter;

export const DimensionBtns: ComponentType<InjectedProps> = ({
  currentDimension,
  setDimension,
}) => (
  <ul>
    {(['all', '2d', '3d'] as const).map((dimension) => (
      <li key={nanoid()}>
        <Btn
          onClick={() => setDimension(dimension)}
          className={classnames(dimension === currentDimension && 'active')}
        >
          {{
            text: dimension,
          }}
        </Btn>
      </li>
    ))}
  </ul>
);

export default connector(withMappedStore(withSetter(DimensionBtns)));
