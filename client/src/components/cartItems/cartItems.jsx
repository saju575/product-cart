import { useSelector } from "react-redux";
import Checkout from "./checkout";
import Item from "./item";

const CartItems = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="w-full lg:w-[70%] bg-white rounded">
      <div className="flex flex-col gap-2">
        {items?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
      <Checkout />
    </div>
  );
};

export default CartItems;
