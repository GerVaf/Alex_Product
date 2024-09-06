import { useGetPackage } from "../../../api/hooks/useQuery";
import PackageCard from "../../ui/PackageCard";

const PackageItem = () => {
  const { data: packages, error, isLoading } = useGetPackage();
  // console.log(packages?.data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!packages || packages.data.length === 0)
    return <div>No products found.</div>;
  return (
    <div className="flex flex-col gap-5">
      {packages.data?.packages?.map((el) => {
        return <PackageCard key={el._id} el={el} />;
      })}
    </div>
  );
};

export default PackageItem;
