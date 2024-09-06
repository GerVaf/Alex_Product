import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import useSidebarStore from "../../store/useSidebarStore";
import { Link } from "react-router-dom";
import useUserStore from "../../store/userStore";

const sidebarVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    x: "0%",
    opacity: 1,
    transition: {
      x: { stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
};

function Sidebar() {
  const sidebarRef = useRef(null);
  const { isSidebarVisible, closeSidebar } = useSidebarStore();

  const { userData, clearUserData } = useUserStore((state) => ({
    userData: state.userData,
    clearUserData: state.clearUserData,
  }));

  // console.log(userData);
  
  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    },
    [closeSidebar]
  );

  const handleScroll = useCallback(() => {
    closeSidebar();
  }, [closeSidebar]);

  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      window.addEventListener("scroll", handleScroll);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isSidebarVisible, handleClickOutside, handleScroll]);

  const handleLogout = () => {
    closeSidebar();
    clearUserData();
    toast.success("Logged out successfully!");
  };

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed main-font top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 flex flex-col"
      initial="hidden"
      animate={isSidebarVisible ? "visible" : "hidden"}
      exit="exit"
      variants={sidebarVariants}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Sidebar</h1>
        <button onClick={closeSidebar}>
          <IconX className="text-white w-6 h-6" />
        </button>
      </div>
      <nav className="mt-4 flex-grow">
        <div className="flex flex-col">
          <Link
            to="/"
            className="p-4 border-y text-xl font-bold hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Home
          </Link>
          <Link
            to="/history"
            className="p-4 border-y text-xl font-bold hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Order Histroy
          </Link>
          <Link
            to="/cart"
            className="p-4 border-y text-xl font-bold hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Your Cart
          </Link>
          <Link
            to="/shop"
            className="p-4 border-y text-xl font-bold hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className="p-4 border-y text-xl font-bold hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Contact
          </Link>
        </div>
      </nav>
      {!userData && (
        <div className="p-4 bg-gray-700 text-center">
          <Link to="/auth/login" onClick={closeSidebar}>
            <button className="gradient-btn rounded-full">Login</button>
          </Link>
        </div>
      )}
      <motion.div
        className="p-4 text-center bg-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        {userData && (
          <div className="bg-gray-700 text-start flex flex-col gap-2">
            <p className="font-bold">{userData?.username}</p>
            <p className="text-sm">{userData?.email}</p>
            <button
              onClick={handleLogout}
              className=" mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full"
            >
              Logout
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;
