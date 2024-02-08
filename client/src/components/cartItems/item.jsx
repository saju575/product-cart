/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "../../redux/features/cart/cartSlice";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(item._id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(item._id));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item._id));
  };
  return (
    <div>
      <div className="flex gap-3 px-2 py-4 mb-2 text-[#4d4d4d]">
        <img
          className="size-16 rounded-sm object-cover"
          // src="https://via.placeholder.com/192x210"
          src={item?.img?.url}
          alt="Product Image"
        />
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between items-center">
            <p className="text-sm">{item?.name}</p>
            <FaTrash onClick={handleRemoveItem} className="cursor-pointer" />
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between space-y-3 sm:space-y-1">
            <div>
              <div className="flex gap-6">
                <p className="text-sm">Color: {item.color}</p>
                <p className="text-sm">Size: {item?.size}</p>
              </div>
              <p className="text-sm">
                Product Price: BDT.{" "}
                {item?.main_price -
                  (item?.main_price * item?.discount_rate) / 100}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">Shipping Method: EMS</p>
              <p className="text-sm">
                Shipping Charge: BDT.{item.shipping_charge}
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-sm flex gap-2">
                Quantity:
                <div className="border flex gap-2 px-3 rounded-xl items-center">
                  <span
                    className="cursor-pointer"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </span>
                  <span className="w-5">{item.quantity}</span>
                  <span
                    className="cursor-pointer"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </span>
                </div>
              </div>
              <p className="text-sm">
                Total Price: BDT.{" "}
                {item.quantity *
                  (item?.main_price -
                    (item?.main_price * item?.discount_rate) / 100)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-[#fafafa]" />
    </div>
  );
};

export default Item;
