import PromoCard from "../../../components/promoCard/promoCard";

const PromoList = () => {
  return (
    <div className="py-8 px-4">
      <div>
        <button
          type="button"
          className="shadow-sm bg-white px-5 py-1 rounded-2xl"
        >
          Add New Promo
        </button>

        <div className="mt-4 flex flex-col gap-4">
          {[1, 2, 3].map((item, index) => (
            <PromoCard key={item} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoList;
