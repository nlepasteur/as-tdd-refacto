// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetters } from './withSetters';
import type { Collection } from '@types';
// libs
import { useContext, useCallback } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
// action creators
import {
  toggleLikesModal,
  toggleAddToCollectionModal,
} from './ProjectContextProvider';
// components
import withProject, { connector } from './withProject';
import withSetters from './withSetters';
import { ProjectContext } from './ProjectContextProvider';
import LikesModal from './LikesModal';
import StopScrollOnArtworkPageOverlayAntagonist from 'components/StopScrollOnArtworkPageOverlayAntagonist';
import AddToCollectionModal from './AddToCollectionModal';

export type InjectedProps = PropsFromWithSetters;

const Artwork: ComponentType<InjectedProps> = ({
  data: project,
  isLogged,
  addPopUpError,
  toggleSignupSigninModal,
  like,
  addCollection,
}) => {
  const { dispatch, showLikesModal, showAddToCollectionModal } =
    useContext(ProjectContext);
  const { state } = useLocation();
  const { id } = useParams();
  //
  // const successCallback = useCallback(() => {
  //   dispatch(toggleAddToCollectionModal());
  // }, [dispatch]);
  //
  const toggleAddToCollectionModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADD_TO_COLLECTION_MODAL' });
  }, [dispatch]);

  const failureCallback = useCallback(
    (arg: { message: string }) => {
      addPopUpError({ ...arg, id: nanoid() });
    },
    [addPopUpError]
  );
  return (
    <StopScrollOnArtworkPageOverlayAntagonist>
      <div>
        {project && showLikesModal ? (
          <LikesModal
            votable_id={id as string}
            toggleLikesModal={() => dispatch(toggleLikesModal())}
          />
        ) : null}
        {project && 'collections' in project && showAddToCollectionModal ? (
          <AddToCollectionModal
            project_id={project.id as string}
            in={[]}
            //
            toggleAddToCollectionModal={toggleAddToCollectionModal}
            // ici problème, pourquoi toggleAddToCollectionModal dispatch une action? il devrait toggle modal
            // failureCallback={(arg: { message: string }) => {
            //   addPopUpError({ ...arg, id: nanoid() });
            // }}
            failureCallback={failureCallback}
            successCallback={addCollection}
          />
        ) : null}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_LIKES_MODAL' })}
          style={{ color: 'white' }}
        >
          toggle LikesModal
        </button>
        <button
          style={{ color: 'white' }}
          onClick={() => dispatch({ type: 'TOGGLE_ADD_TO_COLLECTION_MODAL' })}
        >
          toggle AddToCollectionModal
        </button>
        <Link to={state ? state.from : '/some/user'}>leave artwork {id}</Link>
      </div>
    </StopScrollOnArtworkPageOverlayAntagonist>
  );
};

export default connector(withProject(withSetters(Artwork)));
