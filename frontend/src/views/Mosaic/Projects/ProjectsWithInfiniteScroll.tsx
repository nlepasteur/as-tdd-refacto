// components
import withProjectsV3, { connector as connectorV3 } from './withProjectsV3';
import ProjectsList from './ProjectsList';
import ProjectItem from './ProjectItem';
// HOCs
import withInfiniteScroll from 'HOCs/withInfiniteScroll';

const ProjectsWithInfiniteScrollMosaic = connectorV3(
  withProjectsV3(withInfiniteScroll(ProjectsList(ProjectItem)))
);

export default ProjectsWithInfiniteScrollMosaic;
