// types
import type { ComponentType } from 'react';
import type { Project as ProjectType, CompleteProject } from '@types';
import type { AddToCollectionModalProps } from '../../AddToCollectionModal';
import type { LikesModalProps } from '../../LikesModal';
// components
import StopScrollOnArtworkPageOverlayAntagonist from 'components/StopScrollOnArtworkPageOverlayAntagonist';
import AddToCollectionModal from '../../AddToCollectionModal';
import LikesModal from '../../LikesModal';

export type InjectedProps = Omit<
  AddToCollectionModalProps,
  'toggleModal' | 'project'
> & {
  showAddToCollectionModal: boolean;
  toggleAddToCollectionModal(): void;
} & {
  project: ProjectType;
} & Omit<LikesModalProps, 'toggleModal' | 'votable_id' | 'votable_type'> & {
    toggleLikesModal(): void;
    showLikesModal: boolean;
  };

const Project: ComponentType<InjectedProps> = ({
  showAddToCollectionModal,
  showLikesModal,
  toggleAddToCollectionModal,
  toggleLikesModal,
  updateProjectCollections,
  addPopUpError,
  project,
  ...props
}) => {
  console.log('showAddToCollectionModal: ', showAddToCollectionModal);
  console.log('projects: ', project);
  return (
    <StopScrollOnArtworkPageOverlayAntagonist>
      <>
        <button style={{ color: 'white' }} onClick={toggleAddToCollectionModal}>
          Add To Collection
        </button>
        {project && 'likes_count' in project ? (
          <button style={{ color: 'red' }} onClick={toggleLikesModal}>
            {project.likes_count} Likes
          </button>
        ) : null}

        {showAddToCollectionModal && project && 'collections' in project ? (
          <AddToCollectionModal
            toggleModal={toggleAddToCollectionModal}
            updateProjectCollections={updateProjectCollections}
            project={{ id: project?.id, collections: project.collections }}
            addPopUpError={addPopUpError}
          />
        ) : null}
        {showLikesModal ? (
          <LikesModal
            toggleModal={toggleLikesModal}
            votable_id="id"
            votable_type="comment"
          />
        ) : null}
      </>
    </StopScrollOnArtworkPageOverlayAntagonist>
  );
};

export default Project;
