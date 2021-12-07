// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithComments } from '../withComments';
// libs

// possibilité de voir qui a liké
// possibilité de liker
// possibilité de commenter / reply
// possibilité d'update un comment / reply
// possibilité de remove un comment / reply

// décider d'après comment.liked en amont si sera utilisé comme delete ou comme post
// expliquer pourquoi ce choix (ne voulait pas ajouter responsabilité à fonction "vote" de déterminer ça,
// aurait été trop de responsabilités)
type Vote = {
  created_at: string;
  id: string;
  user_id: string;
  votable_id: string;
  votable_type: 'comment' | 'like';
};

function vote<
  RequestBody = {
    type: 'like' | 'comment';
    votable_id: string;
    votable_type: 'like' | 'comment';
  }
  // éventuellement expliquer pourquoi avoir choisi de créer type dans generic plutôt que dans alias type
  // (pas réutilisé et parce que propre à une fonction bien spécifique)
>(
  succesCb: (votableId: string) => void,
  // expliquer démarche d'entre 2 de sorte à assouplir typage de cbs (pas de typage avec Dispatch<GenericFetchState<Comment> | etc...>) tout en maintenant un contrat
  // expliquer aussi pourquoi fait en internet et pas d'après value retournée issue de fetch (car response.ok détermine est
  // aurait été étrange à retourner)
  failureCb: (errorMessage: string) => void
) {
  return async (body: RequestBody) => {
    try {
      const response = await fetch('/votes');
      const data = await response.json();
      if (!response.ok) {
        throw data.message;
      }
      succesCb(data as Vote['votable_id']);
    } catch (e) {
      failureCb(e as string);
    }
  };
}
// on click déclenche selon liked (donc déterminer en dehors si DELETE ou POST, autrement serait trop à gérer pour une seule fonction)
// const vote = (body: {
//   page: number;
//   type: 'like' | 'comment';
//   votable_id: string;
//   votable_type: 'like' | 'comment';
// }) => {
//   return new Promise((resolve, reject) => {
//     resolve(fetch(''));
//   }).then((response) => response.json());
// };

export type InjectedProps = Omit<PropsFromWithComments, 'dispatchLocally'> & {
  like: ReturnType<typeof like>;
};

const withSetters = (UnwrappedComment: ComponentType<InjectedProps>) => {
  const WithSetters = ({
    dispatchLocally,
    ...props
  }: PropsFromWithComments) => {
    return <UnwrappedComment like={like2(dispatchLocally)} {...props} />;
  };
  return WithSetters;
};

export default withSetters;
