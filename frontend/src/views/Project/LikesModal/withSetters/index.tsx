// types
import type { ComponentType } from 'react';
import type { Following } from '@types';
import type { InjectedProps as LikesModalProps } from '../LikesModal';
// libs
import { createRef, useCallback } from 'react';

export type InjectedProps = Omit<
  LikesModalProps,
  'closeModal' | 'followSuccessCallback'
> & {
  toggleModal(): void;
  invertLikeFollowed(followee_id: string): void;
};

const withSetters = (
  UnwrappedComponent: ComponentType<LikesModalProps & { ref: any }>
) => {
  const WithSetters = ({
    toggleModal,
    invertLikeFollowed,
    ...props
  }: InjectedProps) => {
    const timeline = createRef<gsap.core.Timeline | null>();
    const closeModal = useCallback(() => {
      if (
        timeline instanceof Object &&
        'current' in timeline &&
        timeline.current
      ) {
        timeline.current.reverse().then(() => toggleModal());
      }
    }, [timeline, toggleModal]);

    const followSuccessCallback = (following: Following) => {
      invertLikeFollowed(following.followee_id);
    };

    return (
      <UnwrappedComponent
        followSuccessCallback={followSuccessCallback}
        closeModal={closeModal}
        {...props}
        ref={timeline}
      />
    );
  };
  return WithSetters;
};

export default withSetters;
