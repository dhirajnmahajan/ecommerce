// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";

// import { Button, Card, Container, Grid, Stack, Typography, } from "@mui/material";

// import RHFTextfield from "../../components/customTextFiled/rhf-textfield";
// import { addProduct } from "../../api/products-api/productsApi";
// import { addUser } from "../../api/auth/authApi";

// export default function Register() {

//     const userSchema = Yup.object().shape({
//         name: Yup.string().required('Prodcut name is required'),
//         email: Yup.string().email('enter valild email').required('email is required'),
//         mobile: Yup.number()
//             .required('Mobile number is required')
//             .typeError("Mobile number must be a number")
//             .min(10, "Mobile number must be 10 digits"),
//         password: Yup.string().required('password is required'),
//         // avatar: Yup.string().required('upload product image')
//     })

//     const defaultValues = {
//         name: '',
//         email: '',
//         mobile: '',
//         password: '',
//         image: '',
//     }

//     const methods = useForm({
//         resolver: yupResolver(userSchema),
//         defaultValues
//     })
//     const { control, handleSubmit, setValue, formState: { isSubmitting } } = methods;

//     const onSubmit = handleSubmit(async (userData) => {
//         // console.log("Product data", userData);
//         try {
//             await addUser(userData)
//             console.log("use added", userData);

//         } catch (error) {
//             console.log("product coud not save", error);

//         }

//     })

//     return (
//         <Container maxWidth='sm' >
//             <Card
//                 sx={{ p: 2 }}
//             >
//                 <form onSubmit={onSubmit}>
//                     <Stack spacing={3}>

//                         <Typography variant="h5" fontWeight="600">
//                             Register Here
//                         </Typography>
//                         <Stack spacing={2}>
//                             <RHFTextfield name='name' label="Full Name" control={control} />
//                             <RHFTextfield name='email' label="Email" control={control} />
//                             <RHFTextfield name='mobile' label="Mobile" control={control} />
//                             <RHFTextfield name='password' label="Password" control={control} />
//                             {/* <RHFTextfield name='password' label="Password" control={control} /> */}
//                         </Stack>
//                         <Button disabled={isSubmitting} type="submit" size='large' variant="contained">Add Product </Button>
//                     </Stack>
//                 </form>

//             </Card>
//         </Container >
//     )
// }