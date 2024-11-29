/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const getRandomDuration = () => {
    return Math.floor(Math.random() * 2000) + 2000;
  };

  useEffect(() => {
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const setNewInterval = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        changeImage();
        setNewInterval();
      }, getRandomDuration());
    };

    setNewInterval();

    return () => clearInterval(intervalRef.current);
  }, [product.images.length]);

  return (
    <Link
      to={`/product/${product._id}`}
      key={product._id}
      className="relative h-[200px] col-span-1"
    >
      <div className="rounded border w-full h-[200px] overflow-hidden shadow-xl">
        <AnimatePresence>
          <motion.img
            key={product.images[currentImageIndex]}
            src={product.images[currentImageIndex]}
            alt={product.images[currentImageIndex]}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
      {/* card bottom side */}
      <div className="rounded-t-md flex justify-center items-center text-center text-[10px] rounded-b bg-black/20 backdrop-blur-sm h-[40px] absolute bottom-0 w-full">
        <p className="line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
          consequuntur quaerat aut nobis est veniam atque voluptatibus, quisquam
          explicabo id numquam vero?
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
