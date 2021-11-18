// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromProjectsList } from '../ProjectsList';
// libs
import { Link } from 'react-router-dom';

const ProjectItem: ComponentType<PropsFromProjectsList> = ({
  location,
  project,
}) => (
  <>
    <img
      src={project.smaller_square_cover_url}
      alt={`${project.title}'s thumbnail`}
    />
    <Link
      to={`/artwork/${project.id}`}
      state={{ from: `${location.pathname}${location.search}` }}
    />
  </>
);

export default ProjectItem;
