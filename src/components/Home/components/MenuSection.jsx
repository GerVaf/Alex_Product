/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetProduct } from "../../../api/hooks/useQuery";
import NavBar from "../../ui/NavBar";
import { containerVariants } from "./HeroSection";
import useProductManageStore from "../../../store/productManageStore";
import ProductCard from "../../ui/ProductCard";

const ChooseProductType = () => {
  const { setFilter } = useProductManageStore((state) => ({
    setFilter: state.setFilter,
  }));

  const filterData = [
    "all",
    "limited-edition",
    "anniversary",
    "exclusive",
    "customize",
    "classic",
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab && filterData.includes(savedTab) ? savedTab : "all"; // Ensure 'all' is fallback
  });

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const Tab = ({ children }) => {
    const ref = useRef(null);

    return (
      <motion.li
        ref={ref}
        onMouseEnter={() => {
          if (!ref?.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        onClick={() => {
          setActiveTab(children);
          setFilter(children);
        }}
        className={`relative z-10 w-[120px] text-[10px] text-center block cursor-pointer px-3 py-1.5 uppercase text-black font-bold md:px-5 md:py-3 md:text-base 
          ${
            activeTab === children
              ? "text-white bg-red-700 rounded-full duration-300 transition-all"
              : "transition-all hover:bg-gray-200 rounded-full"
          }
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.li>
    );
  };

  const Cursor = ({ position }) => {
    return (
      <motion.li
        animate={{
          left: position.left,
          width: position.width,
          opacity: position.opacity,
        }}
        className="absolute z-0 h-7 rounded-full bg-red-700 md:h-12"
      />
    );
  };

  const SlideTabs = () => {
    return (
      <motion.ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative flex w-fit rounded-full border-[1px] border-black  bg-white p-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {filterData.map((el) => {
          return <Tab key={el}>{el}</Tab>;
        })}
        <Cursor position={position} />
      </motion.ul>
    );
  };

  useEffect(() => {
    setFilter(activeTab);
  }, [activeTab, setFilter]);

  return (
    <div className="bg-gray-50 rounded py-5 overflow-x-scroll">
      <SlideTabs />
    </div>
  );
};

const MenuSection = () => {
  const { data: products, error, isLoading } = useGetProduct(1, 10);
  const productData = products?.data?.products;

  const setProducts = useProductManageStore((state) => state.setProducts);
  const { filteredProducts } = useProductManageStore((state) => ({
    filteredProducts: state.filteredProducts,
  }));

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData, setProducts]);

  const heart = "<3";
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="md:p-10 p-5 flex flex-col gap-5 md:gap-10">
      <NavBar />
      <motion.div
        className="hero-font text-secondary text-[30px] md:text-[100px] w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        Choose your OOTD! <span className="text-red-700 hero-font">{heart}</span>
      </motion.div>
      <ChooseProductType />

      {/* Display filtered products */}
      <div className="grid grid-cols-2 gap-3 ">
        {filteredProducts()?.length > 0 ? (
          filteredProducts().map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              className="product-card"
            />
          ))
        ) : (
          <div className="h-[60vh]">
            No products found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;
