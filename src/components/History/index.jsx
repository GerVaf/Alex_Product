/* eslint-disable react/no-unescaped-entities */
import { Timeline } from "antd";
import { useGetOrderHistory } from "../../api/hooks/useQuery";
import NavBar from "../ui/NavBar";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/fun";
import Loading from "../ui/Loading";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import EmptyHistory from "/history.png";
const History = () => {
  const { data: orderHistory, isLoading, error } = useGetOrderHistory();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <NavBar padding={"p-5"} />
      {orderHistory?.length === 0 ? (
        <div className="h-[70vh] flex flex-col item-center gap-10 justify-center">
          <div className=" self-center">
            <img src={EmptyHistory} alt="cart" />
          </div>
          <div className="w-[300px] self-center text-xl text-secondary flex flex-col gap-5">
            <p className="text-center">There is no Order.</p>
            <Link to={"/shop"} className="  primary-btn flex justify-between">
              <p>Let's get shop</p>
              <IconArrowRight />
            </Link>
          </div>
        </div>
      ) : (
        <div className="pb-5">
          {orderHistory?.map((order) => {
            return (
              <div
                key={order._id}
                className="p-5 border rounded m-5 shadow main-font"
              >
                <Timeline
                  items={[
                    {
                      color: "purple",
                      children: (
                        <div className="flex flex-col gap-2">
                          <span>Phone Number - {order.phoneNumber}</span>
                          <span>Delivery Place - {order.whereToSend}</span>
                        </div>
                      ),
                    },
                    {
                      color: "purple",
                      children: (
                        <div className="flex flex-col gap-1">
                          {order.items.map((el) => {
                            return (
                              <div key={el._id}>
                                {el?.product?.name} {el?.package?.name} -{" "}
                                {el.quantity} x ${el?.product?.price}
                                {el?.package?.price}
                              </div>
                            );
                          })}
                          <span className="text-violet-700">
                            Total Amount - ${order.totalAmount}
                          </span>
                        </div>
                      ),
                    },
                    {
                      color: "purple",
                      children: (
                        <div>Order Date - {formatDate(order.orderDate)}</div>
                      ),
                    },
                    {
                      dot: (
                        <ClockCircleOutlined className="timeline-clock-icon" />
                      ),
                      color: `${
                        order.progress === "pending"
                          ? "orange"
                          : order.progress === "declined"
                          ? "red"
                          : order.progress === "accepted"
                          ? "green"
                          : order.progress === "done"
                          ? "purple"
                          : null
                      }`,
                      children: (
                        <div className=" uppercase">
                          {order.progress === "accepted"
                            ? "DELIVERYING"
                            : order.progress}
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
