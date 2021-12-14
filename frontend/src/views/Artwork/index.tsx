// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetters } from './withSetters';
// libs
import { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
}) => {
  const { dispatch, showLikesModal, showAddToCollectionModal } =
    useContext(ProjectContext);
  const { state } = useLocation();
  const { id } = useParams();

  const createCollection = async (arg: {
    project_id: string;
    name: string;
  }) => {
    console.log('');
  };
  const addToCollection = async () => {
    console.log('');
  };

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
            createCollection={createCollection}
            addToCollection={addToCollection}
            in={[]}
            collections={project.collections}
            toggleAddToCollectionModal={() =>
              dispatch(toggleAddToCollectionModal())
            }
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
