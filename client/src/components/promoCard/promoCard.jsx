/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";
import { useUpdatePromoMutation } from "../../redux/features/promo/promoApi";
const PromoCard = ({ index, item }) => {
  const [updatePromoStatus] = useUpdatePromoMutation();

  const handleUpdatePromoStatus = async () => {
    try {
      await updatePromoStatus({
        id: item._id,
        data: { status: item.status === "active" ? "inactive" : "active" },
      }).unwrap();
    } catch (error) {
      return;
    }
  };
  return (
    <div className="px-3 py-2 bg-white gap-3 flex flex-col shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p>{index}</p>
          <p>{item.code}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/editpromo/${item._id}`}
            className="bg-[#fff700] p-2 w-24 rounded-3xl text-center"
          >
            Edit
          </Link>

          {item.status === "active" ? (
            <button
              onClick={handleUpdatePromoStatus}
              type="button"
              className="bg-red-300 text-red-500 p-2 w-24  rounded-3xl"
            >
              Deactive
            </button>
          ) : (
            <button
              onClick={handleUpdatePromoStatus}
              type="button"
              className="bg-[#fffee1] p-2 w-24  rounded-3xl"
            >
              Active
            </button>
          )}
        </div>
      </div>
      <div className="bg-[#f3f3f3] h-[1px]" />

      <div className="flex justify-between items-center text-sm">
        <div>
          <p>
            Created At: {moment.utc(item.createdAt).format("h.mmA, DD/MM/YYYY")}
          </p>
        </div>
        <div>
          <p>Usages: {item.usages}</p>
        </div>
        <div>
          <p>Discount Rate: {item.discount_rate}%</p>
        </div>
        <div>
          <p>Start Date: {moment.utc(item.start_time).format("DD/MM/YYYY")}</p>
        </div>
        <div>
          <p>End Date: {moment.utc(item.end_time).format("DD/MM/YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
