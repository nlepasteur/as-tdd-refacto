// libs
import { useRef } from 'react';
// HOCs
import withToggle from 'HOCs/withToggle';
// hooks
import useOnClickOutside from 'hooks/useOnClickOutside';
// components
import Button from './Button';
import Menu from './Menu';
// style
import './MediasMediumsDropDownPicker.css';

export default withToggle(({ toggle, show }) => {
  const mediasMediumsDropDownPicker = useRef(null);
  const onClickOutsideHandler = () => {
    if (show) {
      toggle();
    }
  };
  useOnClickOutside(mediasMediumsDropDownPicker, onClickOutsideHandler);
  return (
    <div className="medias-mediums" ref={mediasMediumsDropDownPicker}>
      <Button toggle={toggle} />
      {show ? <Menu /> : null}
    </div>
  );
});
