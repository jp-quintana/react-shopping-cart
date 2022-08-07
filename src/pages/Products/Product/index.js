import { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import styles from './index.modules.scss';

const Product = (props) => {
  const { products } = props;
  const [productState, setProductState] = useReducer();
  const [modelToDisplay, setModeltToDisplay] = useState([]);
  const { id: urlId } = useParams();

  useEffect(() => {
    const product = products.filter((product) =>
      product.variants.some((variant) => variant.url === urlId)
    );

    setModeltToDisplay(product);
  }, []);

  useEffect(() => {}, []);

  return <div>Hola</div>;
};

export default Product;
