import { useEffect, useState } from "react";
import { AuthContext } from "./createAuthContext";
import { addUser, getUsers } from "../../api/auth/authApi";
import { ComparePassword, ConvertHashPassword } from "../authService";

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

  const isKycApprove = authenticated && user?.kycStatus === "approved";

  const me = async () => {
    const userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
    if (!userEmail) {
      return;
    }

    const users = await getUsers();
    const existingUser = users.find((u) => u.email === userEmail);

    if (!existingUser) {
      throw "user Not Found";
    }

    const userProfile = {
      id: existingUser.id,
      name: existingUser.name,
      pan: existingUser.pan,
      image: existingUser.image,
      email: existingUser.email,
      mobile: existingUser.mobile,
      roleValue: existingUser.roleValue,
      kycStatus: existingUser.kycStatus,
    };

    setUser(userProfile);
    return userProfile;
  };

  const initialize = async () => {
    try {
      const userProfile = await me();
      if (userProfile) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      throw error;
    }
  };

  // login
  async function loginUser(userData) {
    try {
      const users = await getUsers();

      const existingUser = users.find((u) => u.email === userData.email);
      if (!existingUser) {
        setUser(initialData);
        alert("user not found");
        return false;
      }

      const comparedHash = await ComparePassword(
        userData.password,
        existingUser.password,
      );

      if (!comparedHash) {
        alert("Password is incorrect");
        setAuthenticated(false);
        throw new Error("Password incorrect");
      }
      const userProfile = {
        id: existingUser.id,
        name: existingUser.name,
        pan: existingUser.pan,
        image: existingUser.image,
        email: existingUser.email,
        mobile: existingUser.mobile,
        roleValue: existingUser.roleValue,
        kycStatus: existingUser.kycStatus,
      };

      sessionStorage.setItem("userEmail", JSON.stringify(userProfile.email));

      setUser(userProfile);
      setAuthenticated(true);
      return userProfile;
      // console.log("login user");
    } catch (error) {
      console.log("error at login", error);
      throw error;
    }
  }

  // logout function
  function logoutUser() {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        authenticated,
        user,
        isKycApprove,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
