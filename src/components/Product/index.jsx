import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../../api/hooks/useQuery";
import {
  IconBookmark,
  IconSettings,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import StarRating from "../ui/StarRating";
import { motion } from "framer-motion";
import { Button } from "../ui/MovingBorder";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const Product = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductById(id);
  const product = data?.data;
  const [section, setSection] = useState("about");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No product found.</div>;

  const renderSectionContent = () => {
    switch (section) {
      case "about":
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="text-[13px] mx-2 px-2 select-none border-x-[1px] border-black/20 "
          >
            <p>
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quas iusto ea minima fugiat, blanditiis qui,
              placeat odio corporis cumque, recusandae maxime aut quaerat
              sapiente corrupti adipisci ad tempore excepturi eos! Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Natus blanditiis
              eligendi ullam debitis! Quae ea eius fugit rerum necessitatibus
              minus, porro sed ab ratione, dignissimos at voluptatum commodi
              laborum illo.
            </p>
          </motion.div>
        );
      case "reviews":
        return (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-[13px] mx-2 px-2 select-none border-x-[1px] border-black/20 "
          >
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <StarRating rating={review.rating} />
                  <p className="font-semibold">{review.title}</p>
                  <p>{review.content}</p>
                  <p className="text-gray-500 text-sm">
                    - {review.user},{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="text-gray-700 flex flex-col gap-3">
      <div className="w-full h-[50vh] overflow-hidden rounded-b-[25px]">
        <img
          className="w-full h-full object-cover"
          src={product.images[1]}
          alt=""
        />
      </div>

      <div className="px-8 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex text-[10px] border rounded">
            <span className="p-2 px-5 border-r text-centre">XL</span>
            <span className="p-2 px-5 border-r text-centre">XL</span>
            <span className="p-2 px-5 border-r text-centre">XL</span>
            <span className="p-2 px-5 border- text-centre">XL</span>
          </div>
          <IconBookmark className="cursor-pointer" />
        </div>
        <h1 className="text-[20px] font-semibold ">{product.name}</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 flex-col">
            <StarRating rating={product.ratings} />
            <span className="text-yellow-600">rating ({product.ratings})</span>
          </div>
          <div className="text-black font-bold flex flex-col gap-1 text-sm items-center">
            <span className="text-gray-500 font-bold line-through decoration-[3px] decoration-red-700">
              {product.salePrice} Kyats /
            </span>
            <span className="font-bold">
              {product.salePrice - product.discountPrice} Kyats
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex w-full cursor-pointer px-3 ">
          <p
            className={`w-1/2 text-sm text-center font-bold py-1 border-b-2 ${
              section === "about" ? "text-black border-black" : ""
            }`}
            onClick={() => setSection("about")}
          >
            ABOUT
          </p>
          <p
            className={`w-1/2 text-sm text-center font-bold py-1 border-b-2 ${
              section === "reviews" ? "text-black border-black" : ""
            }`}
            onClick={() => setSection("reviews")}
          >
            REVIEWS
          </p>
        </div>
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="my-2 h-[20vh] overflow-y-scroll overflow-hidden "
        >
          {renderSectionContent()}
        </motion.div>
      </div>
      <div className="w-full flex flex-col justify-center items-center py-2 ">
        <Button
          borderRadius="1rem"
          className="bg-white border text-black shadow  w-full font-semibold"
        >
          LET`S GET IT <IconShoppingCartPlus />
        </Button>
        <button
          className="mx-5 text-[15px] rounded-lg py-2 font-semibold text-red-700 flex justify-center items-center gap-1"
          onClick={toggleDrawer(true)}
        >
          CHECK REGISTRATION <IconSettings />
        </button>
      </div>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            height: "80vh",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Registration Details</h2>
        </Box>
      </Drawer>
    </div>
  );
};

export default Product;
