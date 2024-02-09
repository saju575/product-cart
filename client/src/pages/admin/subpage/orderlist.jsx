import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../../../components/orderTable/orderTable";
import { setOrderStatus } from "../../../redux/features/filter/filterSlice";
const OrderList = () => {
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.filter.orderStatus);
  return (
    <div className="py-8 px-4">
      <div className="flex gap-4">
        <div
          className={`w-32 h-16 rounded  p-2 cursor-pointer hover:bg-[#fff700] ${
            orderStatus === "" ? "bg-[#fff700]" : "bg-white"
          }`}
          onClick={() => dispatch(setOrderStatus(""))}
        >
          All
        </div>
        <div
          className={`w-32 h-16 rounded  p-2 cursor-pointer hover:bg-[#fff700] ${
            orderStatus === "pending" ? "bg-[#fff700]" : "bg-white"
          }`}
          onClick={() => dispatch(setOrderStatus("pending"))}
        >
          Pending
        </div>
        <div
          className={`w-32 h-16 rounded  p-2 cursor-pointer hover:bg-[#fff700] ${
            orderStatus === "confirm" ? "bg-[#fff700]" : "bg-white"
          }`}
          onClick={() => dispatch(setOrderStatus("confirm"))}
        >
          Confirmed
        </div>
        <div
          className={`w-32 h-16 rounded  p-2 cursor-pointer hover:bg-[#fff700] ${
            orderStatus === "cancel" ? "bg-[#fff700]" : "bg-white"
          }`}
          onClick={() => dispatch(setOrderStatus("cancel"))}
        >
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
