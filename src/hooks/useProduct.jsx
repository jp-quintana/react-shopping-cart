import { useProductContext } from './useProductContext';

export const useProduct = () => {
  const { selectedProduct, dispatch } = useProductContext();

  const selectVariant = (variantId) => {
    const selectedVariant = selectedProduct.variants.find(
      (variant) => variant.variantId === variantId
    );

    dispatch({ type: 'SELECT_VARIANT', payload: selectedVariant });

    if (selectedVariant.sizes.length === 1) {
      dispatch({
        type: 'SINGLE_SIZE',
        payload: {
          selectedSkuId: selectedVariant.sizes[0].skuId,
          quantity: selectedVariant.sizes[0].quantity,
        },
      });
    }
  };

  const selectSize = ({ skuId, value, stock }) => {
    dispatch({ type: 'SELECT_SIZE', payload: { skuId, value, stock } });
  };

  return { selectVariant, selectSize };
};
