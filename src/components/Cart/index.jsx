/* eslint-disable no-unused-vars */
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

const Cart = () => {
  const items = useManageStore((state) => state.items);
  const increaseQuantity = useManageStore((state) => state.increaseQuantity);
  const decreaseQuantity = useManageStore((state) => state.decreaseQuantity);
  const generatePlaceOrder = useManageStore(
    (state) => state.generatePlaceOrder
  );
  const { data: lastOrder } = useGetOrderHistory();
  // console.log(lastOrder)
  const { mutate: createOrder, isLoading } = useCreateOrder();

  const totalAmount = useTotalAmount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // antd form instance

  // Check the progress of the last order
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
        "You have a pending or accepted order. Please wait before placing a new one."
      );
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      await generatePlaceOrder(values.phoneNumber, values.whereToSend);

      const orderData = useManageStore.getState().placeOrder;

      createOrder(orderData, {
        onSuccess: (response) => {
          showToast.success("Order placed successfully!");

          // Clear cart and reset place order data
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
                      src="../../../public/cart.jpg"
                      alt={el.name}
                    />
                  </div>
                  <div className="text-gray-700 p-5 flex flex-col gap-5 justify-between h-full">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between text-xl font-semibold">
                        <h1 className="">{el.name}</h1>
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
                              className="flex h-[100px] justify-start items-center "
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
                                  src="../../../public/pack.png"
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
              className="bg-indigo-500 shadow-lg shadow-indigo-500/50 py-2 px-5 rounded-full text-white"
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
              className=" bg-gradient-to-tr border  px-5 main-font py-1 rounded "
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-gradient-to-tr border  px-5 main-font py-1 rounded from-violet-500 to-fuchsia-500 text-white"
            >
              Place Order
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart;
