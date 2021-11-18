// types
import type { ComponentType } from 'react';

type IsExplore = { isExplore: true };

type Community = {
  community: true;
  trending?: never;
  latest?: never;
  following?: never;
};
type Trending = {
  community?: never;
  trending: true;
  latest?: never;
  following?: never;
};
type Latest = {
  community?: never;
  trending?: never;
  latest: true;
  following?: never;
};
type Following = {
  community?: never;
  trending?: never;
  latest?: never;
  following: true;
};

type Explore = Community | Trending | Latest | Following;

type IsChannel = { isChannel: true };

export type InjectedProps = Partial<{
  isExplore: true;
  community: true;
  trending: true;
  latest: true;
  following: true;
  isChannel: true;
}>;

const withSpecificExplore = (
  UnwrappedComponent: ComponentType<InjectedProps>
) => {
  function WithSpecificExplore(props: IsExplore & Explore): JSX.Element;
  function WithSpecificExplore(props: IsChannel): JSX.Element;
  function WithSpecificExplore(props: InjectedProps) {
    return <UnwrappedComponent {...props} />;
  }
  return WithSpecificExplore;
};

export default withSpecificExplore;
