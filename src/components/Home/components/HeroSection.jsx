/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const HeroSection = () => {
  // ajust with the WIDTH OF top bar animation AND DECORATION WIDTH
  const [data, setData] = useState([
    {
      id: 1,
      header: "CRASHING HARD",
      title: "BLANKE & CASEY COOK",
      image:
        "https://i.pinimg.com/736x/d6/79/ee/d679eed1dbc06a64a759b9d2a814b35b.jpg",
      active: true,
    },
    {
      id: 2,
      header: "BLACK FRIDAY",
      title: "GET EARLY ACCESS",
      image:
        "https://i.pinimg.com/564x/41/5d/9c/415d9cca091edb7d2e8509c9710965c3.jpg",
      active: false,
    },
    {
      id: 3,
      header: "FALL APART",
      title: "HARD & CRASH",
      image:
        "https://i.pinimg.com/736x/3e/30/02/3e30023f03c0705505556b0ad226556f.jpg",
      active: false,
    },
    {
      id: 4,
      header: "BRICK VEX DUCK",
      title: "BURN IN HELL",
      image:
        "https://i.pinimg.com/736x/50/25/85/502585a7a5d60ca44c825e4de035cbfc.jpg",
      active: false,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    const updatedData = data.map((el, index) => ({
      ...el,
      active: index === activeIndex,
    }));

    setData(updatedData);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className=" overflow-hidden relative ">
      {/* top bar active animation */}
      <div className="flex absolute mt-5 flex-row z-30 w-full justify-center ">
        <div className="grid grid-cols-2 gap-3 lg:gap-16 w-[80%]">
          {data.map((el) => (
            <div
              key={el.id}
              className="flex flex-col gap-2 lg:gap-5 col-span-1"
            >
              <div className="w-full h-1 lg:h-3 border relative overflow-hidden">
                {/* animation div */}
                <motion.div
                  className={`w-full h-full bg-white absolute `}
                  initial={{ translateX: el.active ? 0 : -350 }}
                  animate={{ translateX: el.active ? 0 : -350 }}
                  whileHover={{ translateX: 0 }}
                  transition={{ duration: 1.5 }}
                ></motion.div>
              </div>
              <div className="text-white text-[10px] lg:text-sm">
                <p>{el.title}</p>
                <p>{el.header}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className="w-[400vw] h-[65vh] flex relative"
        animate={{ right: `${activeIndex * 100}vw` }}
        transition={{ duration: 0.5 }}
      >
        {data.map((el) => (
          <motion.div
            key={el.id}
            className="w-[100vw] h-full relative"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* background decoration  */}
            <div className="">
              <img
                className="w-full h-full object-cover z-0 absolute"
                src={el.image}
                alt=""
              />
              <div className="w-full h-full img-decoration z-10 absolute"></div>
              <div className="w-full h-full z-20 absolute bg-black/10 backdrop-blur-sm"></div>
            </div>
            {/* inner data  */}
            <motion.div
              initial={{ opacity: 0, justifyContent: "flex-end" }}
              animate={{
                opacity: el.active ? 1 : 0,
                justifyContent: el.active ? "center" : "flex-end",
              }}
              transition={{ duration: 1.5 }}
              className="w-full h-full mt-14 relative flex items-center  z-50"
            >
              <div className=" lg:w-[60%] lg:h-[50%] w-[85%] h-[55%]  flex lg:flex-row flex-col ">
                {/* left image  */}
                <div className="lg:w-2/4 w-full h-full relative">
                  <img
                    className=" h-full w-full object-cover absolute z-10"
                    src={el.image}
                    alt=""
                  />
                  <div className="h-full w-full inner-img-deco absolute z-20"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
