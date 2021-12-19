// components
import ProjectContextProvider from './ProjectContextProvider';
import withProjects, { connector } from './withProjects';
import Project from './Project';

const Component = connector(withProjects(Project));

const Wrapped = () => (
  <ProjectContextProvider>
    <Component />
  </ProjectContextProvider>
);

export default Wrapped;
