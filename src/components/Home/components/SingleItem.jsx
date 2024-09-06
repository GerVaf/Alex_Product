import { useGetProduct } from "../../../api/hooks/useQuery";
import ProductCard from "../../ui/ProductCard";

const SingleItem = () => {
  const { data: products, error, isLoading } = useGetProduct();
  // console.log(products);
  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {products.data?.products?.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default SingleItem;
