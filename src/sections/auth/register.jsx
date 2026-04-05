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
    name: Yup.string().required(" Name is required"),
    email: Yup.string()
      .email("enter valild email")
      .required("email is required"),
    mobile: Yup.number()
      .required("Mobile number is required")
      .typeError("Mobile number must be a number")
      .min(10, "Mobile number must be 10 digits"),
    pan: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
      .required("Pan Number is required"),
    password: Yup.string().required("password is required"),
    image: Yup.string().required("upload avatar image"),
  });

  const defaultValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    image: "",
    pan: "",
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
      await registerUser(userData);
      navigate("/", { replace: true });
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
            <Stack alignItems="center" spacing={2}>
              <Avatar
                // src={}
                variant="rounded"
                sx={{ width: 160, height: 160 }}
              ></Avatar>

              <Typography variant="subtitle2">JPG, PNG, GIF allowed</Typography>
              <Button variant="outlined" component="label">
                Upload Image
                <RHFImageUpload
                  name="image"
                  control={control}
                  type={"file"}
                  accept={"image/*"}
                />
              </Button>
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
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              variant="contained"
            >
              Register
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
