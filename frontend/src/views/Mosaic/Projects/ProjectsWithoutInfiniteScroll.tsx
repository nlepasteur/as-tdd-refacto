// components
import withProjects, { connector } from './withProjectsV2';
import ProjectsList from './ProjectsList';
import ProjectItem from './ProjectItem';
// HOCs

const ProjectsWithoutInfiniteScrollMosaic = connector(
  withProjects(ProjectsList(ProjectItem))
);

export default ProjectsWithoutInfiniteScrollMosaic;
