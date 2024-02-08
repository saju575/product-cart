import { useSelector } from "react-redux";
import ProductCard from "../components/productCard/productCard";
import { useGetProductsQuery } from "../redux/features/products/productsApi";

const Home = () => {
  const { name } = useSelector((state) => state.filter);

  const { data, isLoading, isError } = useGetProductsQuery({ name });

  let content = null;
  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && !isError && data?.payload?.length > 0) {
    content = data.payload.map((item) => (
      <ProductCard key={item._id} item={item} />
    ));
  }
  return (
    <div>
      <div className="container mx-auto px-3 py-12">
        <div className="mx-auto grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
      </div>
      ;
    </div>
  );
};

export default Home;
