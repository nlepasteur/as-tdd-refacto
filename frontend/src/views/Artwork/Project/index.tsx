// types
import type { ComponentType } from 'react';
import type { Project as ProjectType } from '@types';
import type { InjectedProps as AddToCollectionModalProps } from '../AddToCollectionModalV3/withStateUtils';
// components
import AddToCollectionModal from '../AddToCollectionModalV3';
import StopScrollOnArtworkPageOverlayAntagonist from 'components/StopScrollOnArtworkPageOverlayAntagonist';

export type InjectedProps = Omit<
  AddToCollectionModalProps,
  'toggleModal' | 'project'
> & {
  showAddToCollectionModal: boolean;
  toggleAddToCollectionModal(): void;
} & {
  project: ProjectType;
};

const Project: ComponentType<InjectedProps> = ({
  showAddToCollectionModal,
  toggleAddToCollectionModal,
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
        <div>
          {showAddToCollectionModal && project && 'collections' in project ? (
            <AddToCollectionModal
              toggleModal={toggleAddToCollectionModal}
              updateProjectCollections={updateProjectCollections}
              project={{ id: project?.id, collections: project.collections }}
              addPopUpError={addPopUpError}
            />
          ) : null}
        </div>
      </>
    </StopScrollOnArtworkPageOverlayAntagonist>
  );
};

export default Project;
