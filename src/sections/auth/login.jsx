import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import RHFTextfield from "../../components/customTextFiled/rhf-textfield";
import RHFImageUpload from "../../components/customImageUpload/rhf-image-upload";
import { AuthContext } from "../../auth/authContext/createAuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("enter valild email")
      .required("email is required"),
    password: Yup.string().required(" Password is required"),
  });
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (userData) => {
    // console.log("Product data", userData);
    try {
      await loginUser(userData);
      alert("Loggin succesfully");
      navigate("/", { replace: true });
    } catch (error) {
      console.log("product could not save", error);
      alert(error.message);
    }
  });

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 2 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {/* heading */}
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h5" fontWeight="600">
                Login Form
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <RHFTextfield name="email" label="Email" control={control} />
              <RHFTextfield
                name="password"
                label="Password"
                control={control}
              />
            </Stack>
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              variant="contained"
            >
              Login
            </Button>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </Button>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
