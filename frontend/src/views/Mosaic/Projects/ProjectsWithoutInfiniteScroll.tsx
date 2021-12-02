// components
import withProjectsV3, { connector as connectorV3 } from './withProjectsV3';
import ProjectsList from './ProjectsList';
import ProjectItem from './ProjectItem';
// HOCs

const ProjectsWithoutInfiniteScrollMosaic = connectorV3(
  withProjectsV3(ProjectsList(ProjectItem))
);

export default ProjectsWithoutInfiniteScrollMosaic;
