// components
import withProject, { connector } from './withProject';
import withSetters from './withSetters';
import Project from './Project';

export default connector(withProject(withSetters(Project)));
