// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithProject } from '../withProject';
import type { Vote } from '@types';
import type { PopUpError } from 'application/types';

const hasMessagePropertie = (arg: unknown): arg is { message: string } =>
  arg instanceof Object && 'message' in arg;

const like =
  (
    successCallback: (like: Vote) => void,
    failureCallback: (e: { message: string }) => void
  ) =>
  async (arg: { votable_id: string }) => {
    try {
      const response = await fetch('/votes', {
        method: 'POST',
        body: JSON.stringify(arg),
      });
      const like = await response.json();
      if (!response.ok) {
        throw like as Omit<PopUpError, 'id'>;
      }
      successCallback(like as Vote);
    } catch (e) {
      if (hasMessagePropertie(e)) {
        failureCallback(e);
      }
    }
  };

export type InjectedProps = PropsFromWithProject & { like: typeof like };

const withSetters = (UnwrappedComponent: ComponentType<InjectedProps>) => {
  const WithSetters = (props: PropsFromWithProject) => (
    <UnwrappedComponent {...props} like={like} />
  );

  return WithSetters;
};

export default withSetters;
