// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithHandleClick } from './withSetter';
import type { GridSize } from 'application/types';
// libs
import { nanoid } from 'nanoid';
import classnames from 'classnames';
// components
import withUserFavoriteGridSize, { connector } from './withMappedStore';
import withSetter from './withSetter';
import Btn from 'components/Btn';
// icons
import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
// style
import './GridSizeAdjustment.css';

export type InjectedProps = PropsFromWithHandleClick;

const icons = {
  small: AiOutlineMinus,
  default: BsGrid3X3Gap,
  large: AiOutlinePlus,
};

const disable = ({
  btnGridSize,
  currentGridSize,
}: {
  btnGridSize: GridSize;
  currentGridSize: GridSize;
}) => currentGridSize === btnGridSize && btnGridSize !== 'default';

export const GridSizeBtns: ComponentType<InjectedProps> = ({
  adjustGridSize,
  currentGridSize,
}) => (
  <ul className={classnames('adjust-grid-size-list')}>
    {(['small', 'default', 'large'] as const).map((btnGridSize) => {
      const Icon = icons[btnGridSize];
      return (
        <li
          key={nanoid()}
          className={classnames(
            'adjust-grid-size-list__item',
            btnGridSize === currentGridSize &&
              btnGridSize !== 'default' &&
              'adjust-grid-size-list__item--active'
          )}
        >
          <Btn
            onClick={() => adjustGridSize(btnGridSize)}
            disabled={disable({ currentGridSize, btnGridSize })}
            data-testid={btnGridSize}
          >
            {{
              text: <Icon />,
            }}
          </Btn>
        </li>
      );
    })}
  </ul>
);

export default connector(withUserFavoriteGridSize(withSetter(GridSizeBtns)));
