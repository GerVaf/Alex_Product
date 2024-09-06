/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiBox, FiPackage } from "react-icons/fi";
import { IconHeartFilled } from "@tabler/icons-react";
import { containerVariants } from "./HeroSection";
import SingleItem from "./SingleItem";
import PackageItem from "./PackageItem";
import NavBar from "../../ui/NavBar";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const MenuSection = () => {
  const [selected, setSelected] = useState("single");

  return (
    <div className="md:p-10 p-5 flex flex-col gap-5 md:gap-10">
      <NavBar/>
      <motion.div
        className="hero-font text-secondary text-[30px] md:text-[100px] w-full flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        Choose your sushi <IconHeartFilled className="text-red-500" />
      </motion.div>
      <div className="flex justify-center ">
        <SliderToggle selected={selected} setSelected={setSelected} />
      </div>
      <div className="relative w-full transition-colors bg-gray-100 rounded-lg shadow-lg  overflow-hidden">
        <AnimatePresence mode="wait">
          {selected === "single" ? (
            <motion.div
              key="singleItem"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <SingleItem />
            </motion.div>
          ) : (
            <motion.div
              key="packageItem"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <PackageItem />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "single" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("single");
        }}
      >
        <FiBox className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Single Item</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "package" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("package");
        }}
      >
        <FiPackage className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Package Item</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "package" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default MenuSection;
