// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStore } from '../withProjectsV2';
import type { Project } from 'application/types';
// libs
import classnames from 'classnames';

export type InjectedProps = Pick<PropsFromWithMappedStore, 'location'> & {
  project: Project;
} & { refCb?(ref: HTMLElement): void };

const projectsList = (Component: ComponentType<InjectedProps>) => {
  const ProjectsList = ({
    status,
    error,
    projects,
    location,
    currentGridSize,
    refCb,
    explore,
  }: PropsFromWithMappedStore & { refCb?(ref: HTMLElement): void }) => (
    <div>
      {status === 'init' || status === 'fetching' ? (
        <div>spinner</div>
      ) : status === 'failure' ? (
        <div>error message</div>
      ) : (
        <ul
          className={classnames(
            'mosaic-list',
            explore === 'community' && 'mosaic-list--community'
          )}
        >
          {projects.map((project, i, array) => (
            <li
              key={project.id}
              ref={
                refCb && i === array.length - 1
                  ? (ref) => refCb(ref as HTMLElement)
                  : null
              }
            >
              <Component project={project} location={location} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return ProjectsList;
};

export default projectsList;
