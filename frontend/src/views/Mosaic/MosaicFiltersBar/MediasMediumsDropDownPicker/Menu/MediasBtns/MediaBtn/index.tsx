// types
import type { ComponentType } from 'react';
import type { InjectedProps as PropsFromWithSetter } from '../withSetter';
import type { Media } from 'application/types';

export type InjectedProps = Omit<
  PropsFromWithSetter,
  'medias' | 'pickedMedias'
> & {
  media: Media;
  isPicked: boolean;
};

const MediaBtn: ComponentType<InjectedProps> = ({
  media,
  pickMedia,
  isPicked,
}) => (
  <label htmlFor={media.name}>
    <input
      type="checkbox"
      onChange={() => pickMedia(media.as_query)}
      checked={isPicked}
    />
    {media.name}
    <span className="custom" />
  </label>
);

export default MediaBtn;
