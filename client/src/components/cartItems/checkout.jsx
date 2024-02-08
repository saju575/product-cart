import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../../redux/features/cart/cartSlice";
import { useCheckoutMutation } from "../../redux/features/order/orderApi";
import { useDecrasePromoMutation } from "../../redux/features/promo/promoApi";
import {
  calculateShippingCharge,
  calculateSubtotal,
} from "../../utils/calculateSubTotalAndShippingCharge";
import CheckoutConfirmModal from "../modal/checkoutConfirmModal";

const Checkout = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isAgreeError, setIsAgreeError] = useState(false);
  const { discount, isPromoActive, id } = useSelector((state) => state.promo);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkout] = useCheckoutMutation();
  const [decreasePromos] = useDecrasePromoMutation();
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length < 1) {
      return;
    }
    if (!agree) {
      setIsAgreeError(true);
      return;
    }

    try {
      const totalPrice =
        calculateSubtotal(items) +
        calculateShippingCharge(items) -
        (calculateSubtotal(items) * discount) / 100;
      await checkout({ items_price: totalPrice }).unwrap();
      if (isPromoActive && id) {
        await decreasePromos({ id }).unwrap();
      }

      setIsConfirmModalOpen(true);
      dispatch(clearItems());
    } catch (error) {
      return;
    }
  };
  return (
    <>
      <form onSubmit={handleCheckout}>
        <div className="flex sm:flex-row sm:items-center flex-col gap-2 sm:justify-between px-4 py-2">
          <div>
            <div className="mr-8 h-4 mb-2">
              {isAgreeError && (
                <p className="text-red-500 text-xs">
                  You must agree to the terms and conditions
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="terms"
                name="terms"
                value="HTML"
                className="text-lg"
                checked={agree}
                onChange={() => {
                  setIsAgreeError(false);
                  setAgree((p) => !p);
                }}
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

      {isConfirmModalOpen && (
        <CheckoutConfirmModal setIsOpen={setIsConfirmModalOpen} />
      )}
    </>
  );
};

export default Checkout;
