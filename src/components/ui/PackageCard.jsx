/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import Modal from "./Modal";
import { useManageStore } from "../../store/useManageStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const PackageCard = ({ el }) => {
  const addItem = useManageStore((state) => state.addItem);
  const removeItem = useManageStore((state) => state.removeItem);
  const cartItems = useManageStore((state) => state.items);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const nav = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if package is in the cart
  const isPackageInCart = cartItems?.some((item) => item._id === el._id);

  // Handle button click to add/remove package or show login modal
  const handleButtonClick = () => {
    if (isAuthenticated()) {
      if (isPackageInCart) {
        removeItem(el._id);
      } else {
        addItem(el);
      }
    } else {
      setShowLoginModal(true); // Show login modal if not authenticated
    }
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    nav("/auth/login");
  };

  return (
    <div
      key={el._id}
      className="w-full border rounded shadow-lg p-5 flex flex-col gap-5 bg-gradient-to-tr from-indigo-100 to-violet-100"
    >
      <div className="w-full flex">
        <div className="w-1/2 text-xl flex flex-col justify-around">
          <div>{el.name}</div>
          <p className="text-sm text-gray-500">blahblah</p>
          <p>${el.price}</p>
        </div>
        <div className="w-1/2">
          <img
            className="rounded w-full h-full object-cover"
            src="../../../public/package.jpg"
            alt={el.name}
          />
        </div>
      </div>
      <div>
        <h1 className="text-lg text-gray-700 hero-font mb-5">
          What are they include
        </h1>
        {el.include?.map((item) => (
          <div className="flex justify-start" key={item.name}>
            <div className="w-2/3 text-xl flex flex-col justify-start gap-3">
              <div>{item.name}</div>
              <div className="text-gray-600 text-sm">{item.description}</div>
            </div>
            <div className="w-1/3">
              <img
                className="w-full h-full object-cover"
                src="../../../public/pack.png"
                alt={item.name}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleButtonClick}
        className={`${
          isPackageInCart
            ? "bg-red-600"
            : "bg-gradient-to-r from-violet-600 to-indigo-600"
        } shadow-lg rounded-xl text-white gap-3 p-2 flex px-5 items-center`}
      >
        {isPackageInCart ? (
          <>
            <IconMinus size={15} /> Remove
          </>
        ) : (
          <>
            <IconPlus size={15} /> Add to Cart
          </>
        )}
      </button>
      {/* Reusable Modal Component */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <p className="text-lg">You need to log in to perform this action.</p>
        <div>
          <button onClick={handleLoginRedirect} className="gradient-btn">
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PackageCard;
