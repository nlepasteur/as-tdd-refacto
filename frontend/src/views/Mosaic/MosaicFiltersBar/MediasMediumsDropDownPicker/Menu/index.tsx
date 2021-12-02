// components
import Medias from './MediasBtns';
import Mediums from './MediumsBtns';
// style
import './Menu.css';

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
  <div className="medias-mediums__menu">
    <Medias medias={medias} />
    <Mediums />
  </div>
);

export default Menu;
