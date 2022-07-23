import CollectionRemerasTop from 'assets/images/collection-remeras-top.jpg';
import CollectionRemerasBottom from 'assets/images/collection-remeras-bottom.jpg';
import CollectionBuzosTop from 'assets/images/collection-buzos-top.jpg';
import CollectionBuzosBottom from 'assets/images/collection-buzos-bottom.jpg';
import CollectionAccesoriosTop from 'assets/images/collection-accesorios-top.jpg';
import CollectionAccesoriosBottom from 'assets/images/collection-accesorios-bottom.jpg';

export const DUMMY_COLLECTIONS = [
  {
    id: 1,
    imageTop: CollectionRemerasTop,
    imageBottom: CollectionRemerasBottom,
    title: 'Remeras',
    url: '/categorias/remeras',
  },
  {
    id: 2,
    imageTop: CollectionBuzosTop,
    imageBottom: CollectionBuzosBottom,
    title: 'Buzos',
    url: '/categorias/buzos',
  },
  {
    id: 3,
    imageTop: CollectionAccesoriosTop,
    imageBottom: CollectionAccesoriosBottom,
    title: 'Accesorios',
    url: '/categorias/accesorios',
  },
];
