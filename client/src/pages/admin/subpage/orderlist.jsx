import OrderTable from "../../../components/orderTable/orderTable";

const OrderList = () => {
  return (
    <div className="py-8 px-4">
      <div className="flex gap-4">
        <div className="w-32 h-16 rounded bg-white p-2 cursor-pointer hover:bg-[#fff700]">
          All
        </div>
        <div className="w-32 h-16 rounded bg-white p-2 cursor-pointer hover:bg-[#fff700]">
          Pending
        </div>
        <div className="w-32 h-16 rounded bg-white p-2 cursor-pointer hover:bg-[#fff700]">
          Confirmed
        </div>
        <div className="w-32 h-16 rounded bg-white p-2 cursor-pointer hover:bg-[#fff700]">
          Cancelled
        </div>
      </div>

      <div className="mt-8">
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderList;
