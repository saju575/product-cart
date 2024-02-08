import ProductCard from "../components/productCard/productCard";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto px-3 py-12">
        <div className="mx-auto grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ProductCard key={item} />
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default Home;
