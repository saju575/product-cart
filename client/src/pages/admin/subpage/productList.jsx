import AdminProductCard from "../../../components/adminProductCard/adminProductCard";
import { useGetProductsQuery } from "../../../redux/features/products/productsApi";

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery({ name: "" });

  let content = null;
  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && !isError && data?.payload?.length > 0) {
    content = data.payload.map((item) => (
      <AdminProductCard key={item._id} item={item} />
    ));
  }
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
          {content}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
