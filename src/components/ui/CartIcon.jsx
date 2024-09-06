import { IconShoppingCartFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useManageStore } from "../../store/useManageStore";
import { Link, useLocation } from "react-router-dom";

const CartIcon = () => {
  const cartItems = useManageStore((state) => state.items);
  const hasItems = cartItems?.length > 0;

  const path = useLocation().pathname

  return (
    <AnimatePresence>
      {path !== '/cart' && hasItems && (
        <Link to={"/cart"}>
          <motion.div
            className="fixed right-10 bottom-7 z-50 p-4 flex items-center justify-center text-white bg-gradient-to-tr to-indigo-700 from-violet-700 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                repeat: 1,
                repeatType: "reverse",
              }}
            >
              <span className=" -top-[90%] -right-[90%] absolute bg-red-600 w-6 h-6 flex items-center justify-center rounded-full">
                {cartItems?.length}
              </span>
              <IconShoppingCartFilled />
            </motion.div>
          </motion.div>
        </Link>
      )}
    </AnimatePresence>
  );
};

export default CartIcon;
