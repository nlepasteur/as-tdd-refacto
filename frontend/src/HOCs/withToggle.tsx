// types
import type { ComponentType } from 'react';
// libs
import { Component } from 'react';

const initialState = { show: false };

type State = Readonly<typeof initialState>;

type Props = Partial<{
  chilren: RenderCallback;
  render: RenderCallback;
}>;

type ToggleableComponentProps = {
  show: State['show'];
  toggle: Toggleable['toggle'];
};

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;

class Toggleable extends Component<Props, State> {
  state = initialState;

  render() {
    const { children, render } = this.props;
    const renderProps = { show: this.state.show, toggle: this.toggle };
    if (render) {
      return render(renderProps);
    }
    return children instanceof Function ? children(renderProps) : null;
  }

  private toggle = () => this.setState(updateShowState);
}

const updateShowState = (prevState: State) => ({ show: !prevState.show });

export type InjectedProps = ToggleableComponentProps;

const withToggle = <P extends object>(
  UnwrappedComponent: ComponentType<P & InjectedProps>
) => {
  function WithToggle(props: Omit<P, keyof InjectedProps>) {
    return (
      <Toggleable
        render={(renderProps) => (
          <UnwrappedComponent {...renderProps} {...(props as P)} />
        )}
      />
    );
  }
  return WithToggle;
};

export default withToggle;
