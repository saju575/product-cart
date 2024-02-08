import { Link } from "react-router-dom";
import CartItems from "../components/cartItems/cartItems";
import OrderSummery from "../components/orderSummery/orderSummery";

// import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-3">
        <Link to="/" className="bg-white px-4 py-2 rounded-3xl">
          Go back
        </Link>

        <div className="flex lg:flex-row flex-col gap-5 mt-8">
          <CartItems />
          <OrderSummery />
        </div>
      </div>
    </div>
  );
};

export default Cart;
