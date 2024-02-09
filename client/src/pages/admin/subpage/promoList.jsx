import { Link } from "react-router-dom";
import PromoCard from "../../../components/promoCard/promoCard";
import { useGetPromosQuery } from "../../../redux/features/promo/promoApi";

const PromoList = () => {
  const { data, isLoading, isError } = useGetPromosQuery();

  let content = null;
  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && !isError && data?.payload?.length > 0) {
    content = data.payload.map((item, index) => (
      <PromoCard key={index} item={item} index={index + 1} />
    ));
  }
  return (
    <div className="py-8 px-4">
      <div>
        <Link
          to="/admin/createpromo"
          className="shadow-sm bg-white px-5 py-1 rounded-2xl"
        >
          Add New Promo
        </Link>

        <div className="mt-4 flex flex-col gap-4">
          {/* {[1, 2, 3].map((item, index) => (
            <PromoCard key={item} index={index + 1} />
          ))} */}
          {content}
        </div>
      </div>
    </div>
  );
};

export default PromoList;
