// types
import type { InjectedProps as PropsFromWithSetter } from './withSetter';
// libs
import { nanoid } from 'nanoid';
// components
import withMappedStore, { connector } from './withMappedStore';
import withSetter from './withSetter';
import MediaBtn from './MediaBtn';

const MediaBtns = ({ medias, pickedMedias, ...props }: PropsFromWithSetter) => (
  <div>
    <div>ONLY SHOW PROJECTS WITH:</div>
    <ul>
      {medias.map((media) => (
        <li key={nanoid()}>
          <MediaBtn
            media={media}
            isPicked={RegExp(media.as_query, 'i').test(pickedMedias)}
            {...props}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default connector(withMappedStore(withSetter(MediaBtns)));
