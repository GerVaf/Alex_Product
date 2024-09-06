/* eslint-disable react-refresh/only-export-components */
import {
  IconArrowRight,
  IconArrowUpRight,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import AnimatedDiv from "../../ui/AnimatedDiv";
import NavBar from "../../ui/NavBar";

export const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const HeroSection = () => {
  const spanVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col w-full md:p-10 p-5 gap-10">
      <div className="md:h-[60vh] gap-5 md:w-full flex md:flex-row flex-col">
        {/* left section top  */}
        <div className="md:w-3/5 flex flex-col gap-5 justify-around md:px-5">
          <NavBar />
          <motion.div
            className="hero-font text-secondary text-[50px] md:text-[100px] w-full flex flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={spanVariants}>Discover the </motion.span>
            <motion.span variants={spanVariants}>Ultimate Sushi </motion.span>
            <motion.span variants={spanVariants}>Experience!</motion.span>
          </motion.div>
          <div className="flex md:justify-end md:gap-10 gap-5">
            <button className="gradient-btn flex items-center gap-2 md:gap-5">
              <IconArrowRight size={20} />
              Check menu
            </button>
            <button className="gradient-btn flex items-center gap-2 md:gap-5">
              <IconPlayerPlay size={20} />
              How to order
            </button>
          </div>
        </div>
        {/* right section top  */}
        <div className="md:w-2/5 shadow-xl relative rounded-2xl overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="../../../../public/hero_section.jpg"
            alt="heroimg"
          />
          <div className=" w-full bg-third py-3 md:py-5 text-secondary px-5 md:px-10 flex justify-between items-center absolute bottom-2 md:bottom-5">
            <span className=" text-sm md:text-lg">
              Fresh ingredients sourced locally <br /> and prepared mindfully
            </span>
            <div className="p-3 relative transition duration-150 flex items-center justify-center rounded-full bg-white text-black">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear",
                }}
                className=" absolute rounded-full w-8 h-8 border-dashed border-2 border-black"
              ></motion.div>
              <IconArrowUpRight />
            </div>
          </div>
        </div>
      </div>
      <div className="md:h-[40vh] grid grid-cols-2 md:grid-cols-6 gap-5">
        <div className="p-5 col-span-2 text-secondary flex flex-col justify-around gap-5">
          <span className="text-2xl">
            Purest Sushi Experience <br />
            Focusing on Premium Quality <br />
            Ingredients
          </span>
          <div className="flex justify-start gap-10">
            <button className="secondary-btn">Menu</button>
            <button className="secondary-btn">Reservation</button>
          </div>
        </div>
        <div className=" overflow-hidden relative shadow-lg rounded-lg col-span-2 w-full">
          <div className=" absolute right-5 bottom-5 text-black">
            <div className="text-sm items-center md:text-base flex cursor-pointer hover:bg-secondary hover:text-white px-5 py-2 transition duration-150 rounded-full bg-white text-black">
              <IconArrowUpRight />
              Our Premium Taste
            </div>
          </div>
          <img
            className=" object-cover w-full h-full"
            src="../../../../public/semi_hero1.jpg"
            alt="heroimg"
          />
        </div>
        <AnimatedDiv />
      </div>
    </div>
  );
};

export default HeroSection;
