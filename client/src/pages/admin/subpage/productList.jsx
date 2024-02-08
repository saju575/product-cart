import AdminProductCard from "../../../components/adminProductCard/adminProductCard";

const ProductList = () => {
  return (
    <div className="py-8 px-4">
      <div>
        <button
          type="button"
          className="shadow-sm bg-white px-5 py-1 rounded-2xl"
        >
          Add New Product
        </button>
      </div>

      <div className="mt-4">
        <div className="mx-auto grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 4, 5, 6].map((item) => (
            <AdminProductCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
