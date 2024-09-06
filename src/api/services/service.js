// src/api/services/service.js

import axiosInstance from "../../utils/axios_instance";

export const getMyOrders = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/orders", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
export const getDataNoPagination = async (path) => {
  try {
    const response = await axiosInstance.get(`/${path}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getData = async (path, page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/${path}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createData = async (path, productData) => {
  try {
    const response = await axiosInstance.post(`/${path}`, productData);
    // console.log(response);
    // console.log(path,productData)
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
