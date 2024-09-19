import { AnimatePresence, motion } from "framer-motion";
import EmptyInCart from "./EmptyInCart";
import NavBar from "../ui/NavBar";
import { useManageStore, useTotalAmount } from "../../store/useManageStore";
import { useState } from "react";
import { Modal, Form, Input } from "antd";
import { useCreateOrder, useGetOrderHistory } from "../../api/hooks/useQuery";
import showToast from "../../utils/toast";
import Loading from "../ui/Loading";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import Pack from "/pack.png";
import { splitImageUrls } from "../ui/PackageCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useManageStore((state) => state.items);
  const increaseQuantity = useManageStore((state) => state.increaseQuantity);
  const decreaseQuantity = useManageStore((state) => state.decreaseQuantity);
  const generatePlaceOrder = useManageStore(
    (state) => state.generatePlaceOrder
  );
  const { data: lastOrder } = useGetOrderHistory();
  const { mutate: createOrder, isLoading } = useCreateOrder();

  const [placeOrder, setPlaceOrder] = useState(false);
  const totalAmount = useTotalAmount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // antd form instance

  const lastOrderProgress =
    lastOrder?.length > 0 ? lastOrder[0]?.progress : null;

  const handleIncrease = (item) => {
    increaseQuantity(item._id);
  };

  const handleDecrease = (item) => {
    decreaseQuantity(item._id);
  };

  const handlePlaceOrder = () => {
    if (lastOrderProgress === "pending" || lastOrderProgress === "accepted") {
      showToast.info(
        <div>
          You have a pending or accepted order. Check your{" "}
          <Link to={"/history"} className="text-red-600">
            order history
          </Link>
          . Please wait before placing a new one.
        </div>
      );
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      setPlaceOrder(true);
      await generatePlaceOrder(values.phoneNumber, values.whereToSend);

      const orderData = useManageStore.getState().placeOrder;

      createOrder(orderData, {
        onSuccess: () => {
          showToast.success("Order placed successfully!");

          useManageStore.getState().clearCart();
          useManageStore.getState().resetPlaceOrder();

          setIsModalOpen(false);
          form.resetFields();
        },
        onError: (error) => {
          showToast.error(
            error?.response?.data?.message || "Failed to place order."
          );
        },
        onSettled: () => {
          setPlaceOrder(false);
        },
      });
    } catch (error) {
      console.error("Error in handleModalSubmit:", error);
      showToast.error("Failed to generate order.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col main-font">
      <NavBar padding={"p-5"} />
      {items?.length === 0 ? (
        <EmptyInCart />
      ) : (
        <div className="p-5 flex flex-col gap-5 relative">
          <AnimatePresence>
            {items?.map((el) => (
              <motion.div
                key={el._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full flex flex-col bg-violet-300/40 backdrop-blur-lg rounded overflow-hidden shadow-lg">
                  <div className="h-[200px]">
                    <img
                      className="w-full h-full object-cover"
                      src={splitImageUrls(el.image)[0]}
                      alt={el.name}
                    />
                  </div>
                  <div className="text-gray-700 p-5 flex flex-col gap-5 justify-between h-full">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between text-xl font-semibold">
                        <h1>{el.name}</h1>
                        <span className="text-green-700">${el.price}</span>
                      </div>
                      {el?.description && (
                        <span className="text-base">
                          description - {el?.description} Lorem ipsum dolor sit
                          amet consectetur adipisicing elit. Veritatis voluptate
                          eum sed reiciendis impedit voluptatibus quisquam,
                          soluta rerum et, eaque eveniet sapiente neque nam
                          voluptates cumque quam harum magnam dolore.
                        </span>
                      )}
                      {el?.include && (
                        <div>
                          <h1 className="text-md text-gray-700 hero-font mb-5">
                            What are they include -
                          </h1>
                          {el.include?.map((item) => (
                            <div
                              className="flex h-[100px] justify-start items-center"
                              key={item.name}
                            >
                              <div className="w-2/3 text-md pr-3 flex flex-col justify-start gap-3">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-gray-600 text-sm line-clamp-2">
                                  {item.description} Lorem ipsum dolor sit amet,
                                  consectetur adipisicing elit. Expedita eos
                                  voluptatem distinctio tenetur tempore,
                                  blanditiis voluptatibus est fugiat nihil,
                                  aspernatur aut delectus, enim eligendi! Eum
                                  facere cumque non! Nihil, accusamus.
                                </div>
                              </div>
                              <div className="w-1/3">
                                <img
                                  className="w-full h-full object-cover"
                                  src={Pack}
                                  alt={item.name}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center rounded-full bg-white">
                      <button
                        onClick={() => handleDecrease(el)}
                        className="bg-red-600 text-white flex justify-center items-center w-1/3 py-2 rounded-full"
                      >
                        <IconMinus size={20} />
                      </button>
                      <motion.div
                        key={el.quantity}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-semibold w-1/3 text-center"
                      >
                        {el.quantity}
                      </motion.div>
                      <button
                        onClick={() => handleIncrease(el)}
                        className="bg-violet-600 text-white flex justify-center items-center px-2 py-2 rounded-full w-1/3"
                      >
                        <IconPlus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="sticky z-20 rounded-full bottom-5 bg-white/60 backdrop-blur-md flex items-center justify-between m-3 p-3">
            <div className="text-sm flex items-center flex-col px-3">
              <p>Total Amount</p>
              <span className="text-green-700">${totalAmount}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/50 py-2 px-5 rounded-full text-white"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        title="Confirm Order Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Where to Send"
            name="whereToSend"
            rules={[
              { required: true, message: "Please input the delivery address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gradient-to-tr border px-5 main-font py-1 rounded from-gray-400 to-gray-500 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            {placeOrder ? (
              <button className="bg-gradient-to-tr flex justify-center border px-5 main-font py-1 rounded from-violet-500 to-fuchsia-500 text-white">
                <svg
                  className="text-gray-300 animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                disabled={isLoading}
                type="submit"
                className="bg-gradient-to-tr border px-5 main-font py-1 rounded from-violet-500 to-fuchsia-500 text-white"
              >
                Place Order
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart;
