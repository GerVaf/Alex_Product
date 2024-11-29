import { useQuery, useMutation } from "@tanstack/react-query";
import { createData, getData, getDataNoPagination } from "../services/service";

export const useGetProduct = (page = 1, limit = 5, qualityType = "") => {
  return useQuery({
    queryKey: ["products", page, limit, qualityType],
    queryFn: () => getData("products", page, limit, qualityType),
  });
};
export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getData(`products/${id}`),
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
  });
};

export const useGetOtp = () => {
  return useMutation({
    mutationFn: (email) => createData("users/generate-otp", email),
  });
};

export const useVertifyOtp = () => {
  return useMutation({
    mutationFn: (data) => createData("users/verify-otp", data),
  });
};

export const useGetOrderHistory = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getDataNoPagination("orders/user/history"),
  });
};

export const useGetBlog = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => getData("blogs/public", page, limit),
  });
};

export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getData(`blogs/public/${id}`),
  });
};
