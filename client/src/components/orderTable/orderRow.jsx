/* eslint-disable react/prop-types */

const OrderRow = ({ index }) => {
  return (
    <div className="bg-white mb-4 px-2 py-2 shadow-sm">
      <table className="text-center w-[1100px]">
        <tbody>
          <tr className="py-2 px-3 my-4">
            <td className="w-[200px]">{index + 1}</td>
            <td className="w-[200px]">12345</td>
            <td className="w-[200px]">4500</td>
            <td className="flex gap-2 w-[300px]">
              <button
                type="button"
                className="bg-[#fff700] p-2 w-24 rounded-3xl"
              >
                Confirm
              </button>
              <button
                type="button"
                className="bg-red-500 p-2 w-24 text-white rounded-3xl"
              >
                Cancel
              </button>
            </td>
            <td className="w-[200px]">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderRow;
