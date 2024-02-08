import { useSelector } from "react-redux";
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
      <form>
        <div className="flex sm:flex-row flex-col gap-2 sm:justify-between px-4 py-2">
          <div>
            <div className="mr-8 h-4 mb-2">
              <p className="text-red-500 text-xs">
                You must agree to the terms and conditions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="terms"
                name="terms"
                value="HTML"
                className="text-lg"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the Terms and Conditions, Privacy Policy & Refund
                Policy
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#fff700] uppercase h-10  w-60 rounded-sm"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartItems;
