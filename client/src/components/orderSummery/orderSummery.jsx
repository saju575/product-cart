import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCheckPromoMutation } from "../../redux/features/promo/promoApi";
import {
  calculateShippingCharge,
  calculateSubtotal,
} from "../../utils/calculateSubTotalAndShippingCharge";

const OrderSummery = () => {
  const [promoCodeText, setPromoCodeText] = useState("");

  const { items } = useSelector((state) => state.cart);
  const { discount } = useSelector((state) => state.promo);
  const { userData } = useSelector((state) => state.user);

  const [checkPromo, { isLoading, isError }] = useCheckPromoMutation();
  const navigate = useNavigate();

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    if (promoCodeText === "") return;
    if (userData?.phone) {
      checkPromo({ code: promoCodeText });
    } else {
      navigate("/login", { state: { from: "/cart" } });
    }
  };
  return (
    <div className="w-full lg:w-[30%] ">
      <div className="bg-white text-[#4d4d4d] px-3 max-h-max rounded">
        <div className="flex justify-center py-2">
          <p className="uppercase">Order Summary</p>
        </div>
        <div className="bg-[#f3f3f3] h-[1px]" />
        <div className="py-4 space-y-3">
          <div className="flex justify-between">
            <p>Subtotal(2 items)</p>
            <p>৳ {calculateSubtotal(items)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>৳ {(calculateSubtotal(items) * discount) / 100}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Charge</p>
            <p>৳ {calculateShippingCharge(items)}</p>
          </div>
          <div className="flex justify-between">
            <p>Wallet Debit</p>
            <p>৳ 0</p>
          </div>

          <form className="my-6" onSubmit={handlePromoCodeSubmit}>
            <div className="flex mx-3">
              <input
                type="text"
                placeholder="Type your code"
                className="w-[75%] border-2 border-[#f3f3f3]  py-1 px-2 outline-none"
                value={promoCodeText}
                onChange={(e) =>
                  setPromoCodeText(() =>
                    e.target.value.toString().toUpperCase()
                  )
                }
              />
              <button type="submit" className="bg-[#f3f3f3] w-[25%] py-1">
                Apply
              </button>
            </div>
            <div className="h-4 ml-3 mt-1">
              {!isLoading && isError && (
                <p className="text-red-500 text-sm">Invalid promo code</p>
              )}
            </div>
          </form>
          <div className="flex justify-between">
            <p>Total Payable</p>
            <p>
              ৳{" "}
              {calculateSubtotal(items) +
                calculateShippingCharge(items) -
                (calculateSubtotal(items) * discount) / 100}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
