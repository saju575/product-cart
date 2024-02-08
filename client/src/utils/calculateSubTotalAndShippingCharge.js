const calculateSubtotal = (items) => {
  return items.reduce(
    (total, item) =>
      total +
      (item?.main_price - (item?.main_price * item?.discount_rate) / 100) *
        item.quantity,
    0
  );
};

const calculateShippingCharge = (items) => {
  return items.reduce((total, item) => total + item?.shipping_charge, 0);
};

export { calculateShippingCharge, calculateSubtotal };
