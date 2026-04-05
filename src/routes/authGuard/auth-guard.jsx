import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext/createAuthContext";

export default function AuthGuard({ children }) {
  const { authenticated, user } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.kycStatus !== "approved") {
    return <Navigate to="/review" />;
  }

  return children;
}
