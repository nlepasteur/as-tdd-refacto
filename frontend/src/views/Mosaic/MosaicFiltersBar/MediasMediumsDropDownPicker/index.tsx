// HOCs
import withToggle from 'HOCs/withToggle';
// components
import Button from './Button';
import Menu from './Menu';

export default withToggle(({ toggle, show }) => (
  <div>
    <Button toggle={toggle} />
    {show ? <Menu /> : null}
  </div>
));
