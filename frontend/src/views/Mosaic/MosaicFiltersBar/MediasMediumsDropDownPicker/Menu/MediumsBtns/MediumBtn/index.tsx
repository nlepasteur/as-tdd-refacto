// types
import type { ComponentType } from 'react';
import type { Medium } from 'application/types';
import type { InjectedProps as PropsFromWithSetter } from '../withSetter';

export type InjectedProps = Omit<
  PropsFromWithSetter,
  'mediums' | 'pickedMediums'
> & {
  medium: Medium;
  isPicked: boolean;
};

const MediumBtn: ComponentType<InjectedProps> = ({
  medium,
  isPicked,
  pickMedium,
}) => (
  <label htmlFor={medium.name}>
    <input
      type="checkbox"
      onChange={() => pickMedium(medium.id)}
      checked={isPicked}
    />
    {medium.name}
    <span className="custom" />
  </label>
);

export default MediumBtn;
