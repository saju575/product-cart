/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { useUpdateOrderMutation } from "../../redux/features/order/orderApi";

const OrderRow = ({ index, item }) => {
  const { orderStatus } = useSelector((state) => state.filter);
  const [updateOrder] = useUpdateOrderMutation();
  return (
    <div className="bg-white mb-4 px-2 py-2 shadow-sm">
      <table className="text-center w-[1100px]">
        <tbody>
          <tr className="py-2 px-3 my-4">
            <td className="w-[200px]">{index}</td>
            <td className="w-[200px]">12345</td>
            <td className="w-[200px]">{item?.items_price}</td>
            <td className="flex gap-2 w-[300px]">
              {(orderStatus === "" || orderStatus === "pending") &&
                item?.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateOrder({
                          id: item._id,
                          data: { status: "confirm" },
                        })
                      }
                      type="button"
                      className="bg-[#fff700] p-2 w-24 rounded-3xl"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        updateOrder({
                          id: item._id,
                          data: { status: "cancel" },
                        })
                      }
                      type="button"
                      className="bg-red-500 p-2 w-24 text-white rounded-3xl"
                    >
                      Cancel
                    </button>
                  </>
                )}
            </td>
            <td className="w-[200px]">{item?.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderRow;
