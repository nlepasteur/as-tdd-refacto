// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
import type { GridSize } from 'application/types';
// components
import withUserFavoriteGridSize, {
  connector,
} from './withUserFavoriteGridSize';
import withSetter from './withSetter';
import Btn from 'components/Btn';

export type InjectedProps = PropsFromWithSetter;

const disableBtn = ({
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
  <ul>
    <li>
      <Btn
        onClick={() => adjustGridSize('small')}
        disabled={disableBtn({ currentGridSize, btnGridSize: 'small' })}
        data-testid="small"
      >
        {{
          text: 'small icon',
        }}
      </Btn>
    </li>
    <li>
      <Btn
        onClick={() => adjustGridSize('default')}
        disabled={disableBtn({ currentGridSize, btnGridSize: 'default' })}
        data-testid="default"
      >
        {{
          text: 'default icon',
        }}
      </Btn>
    </li>
    <li>
      <Btn
        onClick={() => adjustGridSize('large')}
        disabled={disableBtn({ currentGridSize, btnGridSize: 'large' })}
        data-testid="large"
      >
        {{
          text: 'large icon',
        }}
      </Btn>
    </li>
  </ul>
);

export default connector(withUserFavoriteGridSize(withSetter(GridSizeBtns)));
