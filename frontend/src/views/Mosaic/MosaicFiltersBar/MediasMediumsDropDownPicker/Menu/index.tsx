// components
import Medias from './MediasBtns';
import Mediums from './MediumsBtns';

const medias = [
  {
    name: 'media 1',
    as_query: 'media_1',
  },
  {
    name: 'media 2',
    as_query: 'media_2',
  },
];

const Menu = () => (
  <div>
    <Medias medias={medias} />
    <Mediums />
  </div>
);

export default Menu;
