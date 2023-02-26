import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAdmin } from 'hooks/useAdmin';

import AdminProduct from './AdminProduct';

const AdminEditProduct = () => {
  const { getProduct } = useAdmin();
  const { productId: paramsId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(paramsId);

      setProduct(product);
    };

    fetchProduct();
  }, []);

  return (
    <>
      {product && (
        <AdminProduct
          isEditPage={paramsId}
          currentInventoryLevels={product.currentInventoryLevels}
          productImages={product.images}
          productModel={product.model}
          productType={product.type}
          productCollection={product.collection}
          productDescription={product.description}
          productBaseSku={product.baseSku}
          productTags={product.tags}
          productSizesInput={product.sizesInput}
          productVariants={product.variants}
          productSizes={product.sizes}
        />
      )}
    </>
  );
};

export default AdminEditProduct;
