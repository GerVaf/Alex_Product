// src/api/hooks/useQuery.js
import { useQuery, useMutation } from "@tanstack/react-query";
import { createData, getData, getDataNoPagination } from "../services/service";

export const useGetProduct = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getData("products", page, limit),
  });
};
export const useGetPackage = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["packages", page, limit],
    queryFn: () => getData("packages", page, limit),
  });
};
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData) => createData("orders", orderData),
    // onSuccess: (response) => {
    //   // console.log(response);
    // },
    // onError: (error) => {
    //   // console.error("Error creating order:", error); // Logs the error for debugging
    // },
  });
};
export const useGetOrderHistory = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getDataNoPagination("orders/user/history"),
  });
};
