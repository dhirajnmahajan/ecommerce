import api from "../axiosInstance";

export const addUser = async (userData) => {
  try {
    const res = await api.post("/users", userData);
    return res.data;
  } catch (error) {
    console.log("error while registeration", error);
    throw new error();
  }
};

export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.log("error while gettign user", error);
    throw new error();
  }
};
