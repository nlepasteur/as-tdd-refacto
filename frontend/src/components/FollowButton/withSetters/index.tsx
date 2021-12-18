// types
import type { ComponentType } from 'react';
import type { Following } from '@types';
import type { InjectedProps as ButtonProps } from '../Button';

export type InjectedProps = Omit<ButtonProps, 'follow'> & {
  successCallback(following: Following): void;
};

const follow =
  (successCallback: (following: Following) => void) =>
  async (arg: { followee_id: string }) => {
    try {
      const response = await fetch('/followings', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const following = await response.json();
      successCallback(following);
    } catch (e) {
      // handle errors
    }
  };

const withSetters = (UnwrappedComponent: ComponentType<ButtonProps>) => {
  const WithSetters = ({ successCallback, ...props }: InjectedProps) => {
    return <UnwrappedComponent follow={follow(successCallback)} {...props} />;
  };
  return WithSetters;
};

export default withSetters;
