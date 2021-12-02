// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithMappedStoreV3 } from '../withProjectsV3';
import type { Project } from 'application/types';
// libs
import classnames from 'classnames';
// style
import '../Projects.css';

export type InjectedProps = Pick<PropsFromWithMappedStoreV3, 'location'> & {
  project: Project;
} & { refCb?(ref: HTMLElement): void };

const projectsList = (Component: ComponentType<InjectedProps>) => {
  const ProjectsList = ({
    status,
    error,
    projects,
    shuffledProjects,
    location,
    currentGridSize,
    refCb,
    explore,
  }: PropsFromWithMappedStoreV3 & { refCb?(ref: HTMLElement): void }) => {
    const displayedProjects =
      explore === 'community' && shuffledProjects ? shuffledProjects : projects;
    return (
      <div>
        {status === 'init' || status === 'fetching' ? (
          <div>spinner</div>
        ) : status === 'failure' ? (
          <div>error message</div>
        ) : (
          <ul
            className={classnames(
              'mosaic-list',
              explore === 'community' && 'mosaic-list--community',
              currentGridSize && `mosaic-list--${currentGridSize}`
            )}
          >
            {displayedProjects.map((project, i, array) => (
              <li
                key={project.id}
                ref={
                  refCb && i === array.length - 1
                    ? (ref) => refCb(ref as HTMLElement)
                    : null
                }
                className={classnames(
                  'mosaic-list__item',
                  explore === 'community' &&
                    `mosaic-list__item--${projects.indexOf(
                      projects.find((p) => p.id === project.id) as Project
                    )}`
                )}
              >
                <Component project={project} location={location} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return ProjectsList;
};

export default projectsList;
