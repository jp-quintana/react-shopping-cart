import Slide1 from 'assets/images/slide-1.jpg';
import Slide2 from 'assets/images/slide-2.jpg';
import Slide3 from 'assets/images/slide-3.jpg';

import Slide4 from 'assets/images/productos-hoodie-de-gira-blanco-2.jpg';
import Slide5 from 'assets/images/productos-remera-ojos-negra-2.jpg';
import Slide6 from 'assets/images/productos-remera-de-gira-blanca-2.jpg';

export const BIG_SCREEN_SLIDES = [
  {
    image: Slide1,
    id: 1,
    is_active: true,
    url: '/categorias/productos',
  },
  {
    image: Slide2,
    id: 2,
    is_active: false,
    url: '/categorias/productos',
  },
  {
    image: Slide3,
    id: 3,
    is_active: false,
    url: '/categorias/productos',
  },
];

export const SMALL_SCREEN_SLIDES = [
  {
    image: Slide4,
    id: 1,
    is_active: true,
    url: '/categorias/productos',
  },
  {
    image: Slide5,
    id: 2,
    is_active: false,
    url: '/categorias/productos',
  },
  {
    image: Slide6,
    id: 3,
    is_active: false,
    url: '/categorias/productos',
  },
];
