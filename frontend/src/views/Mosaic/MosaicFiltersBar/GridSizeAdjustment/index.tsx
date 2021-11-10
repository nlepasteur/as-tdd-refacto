// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
// components
import withUserFavoriteGridSize, {
  connector,
} from './withUserFavoriteGridSize';
import withSetter from './withSetter';
import GridSizeBtn from './GridSizeBtn';

type InjectedProps = PropsFromWithSetter;

const GridSizeBtns: ComponentType<InjectedProps> = ({
  adjustGridSize,
  ...props
}) => (
  <ul>
    <li>
      <GridSizeBtn handleClick={adjustGridSize} {...props} btnGridSize="small">
        {{
          title: <i>small</i>,
        }}
      </GridSizeBtn>
    </li>
    <li>
      <GridSizeBtn
        handleClick={adjustGridSize}
        {...props}
        btnGridSize="default"
      >
        {{
          title: <i>default</i>,
        }}
      </GridSizeBtn>
    </li>
    <li>
      <GridSizeBtn handleClick={adjustGridSize} {...props} btnGridSize="large">
        {{
          title: <i>large</i>,
        }}
      </GridSizeBtn>
    </li>
  </ul>
);

export default connector(withUserFavoriteGridSize(withSetter(GridSizeBtns)));
