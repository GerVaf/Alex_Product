// src/api/hooks/useProdPkg.js

import { useQuery } from "@tanstack/react-query";
import {
  getData,
} from "../services/service";

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

