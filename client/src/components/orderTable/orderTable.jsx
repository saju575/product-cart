import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import OrderRow from "./orderRow";

const OrderTable = () => {
  const { orderStatus } = useSelector((state) => state.filter);

  const { data, isLoading, isError } = useGetAllOrdersQuery({
    status: orderStatus,
  });

  let content = null;
  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && !isError && data?.payload?.length > 0) {
    content = data?.payload?.map((item, index) => (
      <OrderRow key={index} index={index + 1} item={item} />
    ));
  }
  return (
    <div className="overflow-x-auto">
      <table className="text-center w-[1100px]">
        <tbody>
          <tr className="py-2 px-3 my-4">
            <td className="w-[200px]">SL</td>
            <td className="w-[200px]">Order No</td>
            <td className="w-[200px]">Item Price</td>

            <td className="w-[300px]">Action</td>
            <td className="w-[200px]">Status</td>
          </tr>
        </tbody>
      </table>
      {content}
    </div>
  );
};

export default OrderTable;
