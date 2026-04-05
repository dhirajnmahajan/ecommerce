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
import { useContext } from "react";
import { AuthContext } from "../../auth/authContext/createAuthContext";
import { useNavigate } from "react-router-dom";
// import { addUser } from "../../api/auth/authApi";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const userSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
      .required("Mobile number is required"),

    pan: Yup.string()
      .transform((value) => value?.toUpperCase())
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter valid PAN (ABCDE1234F)")
      .required("PAN number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    image: Yup.mixed().test(
      "required",
      "Image is required",
      (value) => !!value,
    ),
  });

  const defaultValues = {
    name: "",
    email: "",
    mobile: "",
    pan: "",
    password: "",
    image: "",
  };

  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const imageFile = watch("image");

  const onSubmit = handleSubmit(async (userData) => {
    // console.log("Product data", userData);
    try {
      await registerUser(userData);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("user not register", error);
    }
  });

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 2 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h5" fontWeight="600">
                Registeration Form (KYC)
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <RHFTextfield name="name" label="Full Name" control={control} />
              <RHFTextfield name="email" label="Email" control={control} />
              <RHFTextfield name="mobile" label="Mobile" control={control} />
              <RHFTextfield name="pan" label="Pan Number" control={control} />
              <RHFTextfield
                name="password"
                label="Password"
                control={control}
              />
            </Stack>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={imageFile || ""}
                variant="rounded"
                sx={{ width: 160, height: 160 }}
              ></Avatar>

              <Typography variant="subtitle2">JPG, PNG allowed</Typography>
              <Button variant="outlined" component="label">
                Upload Pan Card
                <RHFImageUpload
                  name="image"
                  control={control}
                  type={"file"}
                  accept={"image/*"}
                />
              </Button>
            </Stack>
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              variant="contained"
            >
              Register
            </Button>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </Button>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
