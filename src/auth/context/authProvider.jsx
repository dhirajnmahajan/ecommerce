import { useEffect, useState } from "react";
import { AuthContext } from "./createAuthContext";
import { addUser } from "../../api/auth/authApi";
import { ConvertHashPassword } from "../authService";

export default function AuthProvider({ children }) {
  const initialData = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  };

  const [user, setUser] = useState(initialData);
  const [authenticated, setAuthenticated] = useState(false);

  const me = () => {};
  const initialize = () => {
    me();
  };

  // initialize me call
  useEffect(() => {
    initialize();
  }, []);

  // register user
  const registerUser = async (userData) => {
    try {
      // console.log("register user called");
      // console.log("registe 1", formdata);
      if (!userData) return;

      const hashPassword = await ConvertHashPassword(userData.password);

      const updatedUser = {
        ...userData,
        password: hashPassword,
        roleValue: "user",
        kycStatus: "pending",
      };
      // console.log("updatedUser", updatedUser);
      if (!updatedUser) return;

      const res = await addUser(updatedUser);
      console.log("res", res);
      setUser(res);
      setAuthenticated(true);
      window.alert("Registeration Done");
    } catch (error) {
      console.log("registeration failed", error);
    }
  };

  // login
  function loginUser(userData) {}

  // logout function
  function logoutUser() {}

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, authenticated, user, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
