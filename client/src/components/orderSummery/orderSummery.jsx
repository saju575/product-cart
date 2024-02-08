const OrderSummery = () => {
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
            <p>৳ 4000</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>৳ 0</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Charge</p>
            <p>৳ 200</p>
          </div>
          <div className="flex justify-between">
            <p>Wallet Debit</p>
            <p>৳ 0</p>
          </div>

          <form className="my-6">
            <div className="flex mx-3">
              <input
                type="text"
                placeholder="Type your code"
                className="w-[75%] border-2 border-[#f3f3f3]  py-1 px-2 outline-none"
              />
              <button className="bg-[#f3f3f3] w-[25%] py-1">Apply</button>
            </div>
          </form>
          <div className="flex justify-between">
            <p>Total Payable</p>
            <p>৳ 3000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;