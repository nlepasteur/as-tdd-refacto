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
  (dispatch: PropsFromWithComments['dispatch']) =>
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
    try {
      // http post request
      // pas de relance de fetch après mais juste une mise à jour du state
      // correspondant à changement si réponse ok
    } catch (e) {
      // handle error
    }
  };
