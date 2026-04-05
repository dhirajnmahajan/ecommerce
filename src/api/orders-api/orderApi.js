import api from "../axiosInstance";

export const addOrder = async (orderData) => {
  try {
    const res = await api.post("/orders", orderData);
    console.log("order added");

    return res.data;
  } catch (error) {
    console.log("error at adding order", error);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const res = await api.post(`/orders/${id}`, orderData);
    console.log("order update");
    return res.data;
  } catch (error) {
    console.log("error at updating order", error);
    throw error;
  }
};
