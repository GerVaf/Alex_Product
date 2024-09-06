// src/store/useManageStore.jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useManageStore = create(
  persist(
    (set) => ({
      items: [],
      placeOrder: {
        items: [],
        phoneNumber: "",
        whereToSend: "",
        progress: "pending",
      },
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, quantity: 1 }],
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== itemId),
        })),
      increaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item._id === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      generatePlaceOrder: (phoneNumber, whereToSend) =>
        set((state) => {
          const formattedItems = state.items
            .map((item) => {
              if (item.include === undefined) {
                return {
                  product: item._id,
                  quantity: item.quantity,
                };
              } else {
                return {
                  package: item._id,
                  quantity: item.quantity,
                };
              }
            })
            .filter(Boolean);

          return {
            placeOrder: {
              items: formattedItems,
              phoneNumber,
              whereToSend,
              progress: "pending",
            },
          };
        }),
      clearCart: () => set({ items: [] }),
      resetPlaceOrder: () =>
        set({
          placeOrder: {
            items: [],
            phoneNumber: "",
            whereToSend: "",
            progress: "pending",
          },
        }),
    }),
    { name: "data-storage" }
  )
);

export const useTotalAmount = () => {
  const items = useManageStore((state) => state.items);
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
