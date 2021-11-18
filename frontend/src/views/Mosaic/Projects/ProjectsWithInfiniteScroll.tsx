// components
import withProjects, { connector } from './withProjectsV2';
import ProjectsList from './ProjectsList';
import ProjectItem from './ProjectItem';
// HOCs
import withInfiniteScroll from 'HOCs/withInfiniteScroll';

const ProjectsWithInfiniteScrollMosaic = connector(
  withProjects(withInfiniteScroll(ProjectsList(ProjectItem)))
);

export default ProjectsWithInfiniteScrollMosaic;
