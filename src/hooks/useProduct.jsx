import { useProductContext } from './useProductContext';

export const useProduct = () => {
  const { selectedProduct, dispatch } = useProductContext();

  const selectVariant = (variantId) => {
    const variant = selectedProduct.variants.find(
      (variant) => variant.variantId === variantId
    );

    dispatch({ type: 'SELECT_VARIANT', payload: variant });
  };

  const selectSize = ({ skuId, value, stock }) => {
    dispatch({ type: 'SELECT_SIZE', payload: { skuId, value, stock } });
  };

  return { selectVariant, selectSize };
};
