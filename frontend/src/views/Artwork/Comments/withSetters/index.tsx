// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithComments } from '../withComments';
// libs

// possibilité de voir qui a liké
// possibilité de liker
// possibilité de commenter / reply
// possibilité d'update un comment / reply
// possibilité de remove un comment / reply
const like =
  (dispatch: PropsFromWithComments['dispatchLocally']) =>
  async ({
    page,
    type,
    votable_id,
    votable_type,
  }: {
    page: number;
    type: 'like' | ' comment';
    votable_type: 'like' | ' comment';
    votable_id: string;
  }) => {
    console.log('like triggered with id: ', votable_id);
    try {
      // http post request
      // pas de relance de fetch après mais juste une mise à jour du state
      // correspondant à changement si réponse ok
      // const response = await fetch('', {}) <= si réponse alors signifie que a été pris en compte
      dispatch({ type: 'UPDATE_LIKES', payload: votable_id });
    } catch (e) {
      // handle error
    }
  };

export type InjectedProps = Omit<PropsFromWithComments, 'dispatchLocally'> & {
  like: ReturnType<typeof like>;
};

const withSetters = (UnwrappedComment: ComponentType<InjectedProps>) => {
  const WithSetters = ({
    dispatchLocally,
    ...props
  }: PropsFromWithComments) => {
    return <UnwrappedComment like={like(dispatchLocally)} {...props} />;
  };
  return WithSetters;
};

export default withSetters;
