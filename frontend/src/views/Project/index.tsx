// components
import ProjectContextProvider from './ProjectContextProvider';
import Project from './Project';

const Wrapped = () => (
  <ProjectContextProvider>
    <Project />
  </ProjectContextProvider>
);

export default Wrapped;
