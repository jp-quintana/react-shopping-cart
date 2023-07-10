export const updateCartAtLogin = (items) => {
  let updatedItems = [];

  items.forEach((item) => {
    const itemInCartIndex = updatedItems.findIndex(
      (i) => i.skuId === item.skuId
    );

    if (itemInCartIndex >= 0) {
      updatedItems[itemInCartIndex].quantity += item.quantity;
    } else {
      updatedItems.push(item);
    }
  });

  return updatedItems;
};
