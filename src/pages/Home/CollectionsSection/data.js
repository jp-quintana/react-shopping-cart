import CollectionRemerasTop from 'assets/images/collection-remeras-top.jpg';
import CollectionRemerasBottom from 'assets/images/collection-remeras-bottom.jpg';
import CollectionBuzosTop from 'assets/images/collection-buzos-top.jpg';
import CollectionBuzosBottom from 'assets/images/collection-buzos-bottom.jpg';
import CollectionAccesoriosTop from 'assets/images/collection-accesorios-top.jpg';
import CollectionAccesoriosBottom from 'assets/images/collection-accesorios-bottom.jpg';

export const DUMMY_COLLECTIONS = [
  {
    id: 1,
    image_top: CollectionRemerasTop,
    image_bottom: CollectionRemerasBottom,
    title: 'Remeras',
    url: '/categorias/remeras',
  },
  {
    id: 2,
    image_top: CollectionBuzosTop,
    image_bottom: CollectionBuzosBottom,
    title: 'Buzos',
    url: '/categorias/buzos',
  },
  {
    id: 3,
    image_top: CollectionAccesoriosTop,
    image_bottom: CollectionAccesoriosBottom,
    title: 'Accesorios',
    url: '/categorias/accesorios',
  },
];
