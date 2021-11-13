// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithHandleClick } from './withHandleClick';
import type { GridSize } from 'application/types';
// libs
import { nanoid } from 'nanoid';
// components
import withUserFavoriteGridSize, { connector } from './withMappedStore';
import withSetter from './withHandleClick';
import Btn from 'components/Btn';
// icons
import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

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
  handleClick,
  currentGridSize,
}) => (
  <ul>
    {(['small', 'default', 'large'] as const).map((btnGridSize) => {
      const Icon = icons[btnGridSize];
      return (
        <li key={nanoid()}>
          <Btn
            onClick={() => handleClick(btnGridSize)}
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
