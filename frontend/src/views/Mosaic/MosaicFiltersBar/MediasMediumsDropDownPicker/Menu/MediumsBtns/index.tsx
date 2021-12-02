// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
// utils
import testSubstring from 'utils/testSubstring';
// components
import withMappedStore, { connector } from './withMappedStore';
import withSetter from './withSetter';
import MediumBtn from './MediumBtn';

const MediumsBtns: ComponentType<PropsFromWithSetter> = ({
  mediums,
  pickedMediums,
  ...props
}) => (
  <div>
    <div>MEDIUMS</div>
    <ul>
      {mediums.map((medium) => (
        <li key={medium.id}>
          <MediumBtn
            {...props}
            isPicked={testSubstring({
              string: pickedMediums,
              substring: medium.id,
            })}
            medium={medium}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default connector(withMappedStore(withSetter(MediumsBtns)));
