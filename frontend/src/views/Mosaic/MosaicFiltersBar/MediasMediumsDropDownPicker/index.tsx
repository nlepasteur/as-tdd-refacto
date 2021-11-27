// HOCs
import withToggle from 'HOCs/withToggle';
// components
import Button from './Button';
import Menu from './Menu';
// style
import './MediasMediumsDropDownPicker.css';

export default withToggle(({ toggle, show }) => (
  <div className="medias-mediums">
    <Button toggle={toggle} />
    {show ? <Menu /> : null}
  </div>
));
