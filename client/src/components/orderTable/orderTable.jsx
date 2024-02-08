import OrderRow from "./orderRow";

const OrderTable = () => {
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
      {[1, 2, 3, 4].map((item, index) => (
        <OrderRow key={item} index={index} />
      ))}
    </div>
  );
};

export default OrderTable;
