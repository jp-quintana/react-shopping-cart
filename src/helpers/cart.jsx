// TODO: update this
export const updateCartAtLogin = (items) => {
  let updatedItems = [];
  let updatedTotalAmount = 0;

  items.forEach((item) => {
    updatedTotalAmount += item.amount;

    const itemInCartIndex = updatedItems.findIndex((i) => i.id === item.id);

    if (itemInCartIndex >= 0) {
      updatedItems[itemInCartIndex].amount += item.amount;
    } else {
      updatedItems.push(item);
    }
  });

  return { items: updatedItems, totalAmount: updatedTotalAmount };
};
