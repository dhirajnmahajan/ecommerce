import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Avatar, Button, Card, Container, Grid, Stack, Typography, } from "@mui/material";

import RHFTextfield from "../../components/customTextFiled/rhf-textfield";
import RHFImageUpload from "../../components/customImageUpload/rhf-image-upload"
import { addProduct } from "../../api/products-api/productsApi";

export default function ProductNewEditForm() {
    // const enqueSnackbar = Snackbar()

    const productSchema = Yup.object().shape({
        pname: Yup.string().required('Prodcut name is required'),
        price: Yup.number().required('Product price is required').typeError("Price must be a number"),
        description: Yup.string().required('description is required'),
        image: Yup.string().required('upload product image')
    })

    const defaultValues = {
        pname: '',
        price: '',
        description: '',
        image: '',
    }

    const methods = useForm({
        resolver: yupResolver(productSchema),
        defaultValues
    })
    const { control, handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (productData) => {
        // console.log("Product data", productData);
        try {
            await addProduct(productData)
            console.log("Product saved ", productData);

        } catch (error) {
            console.log("product coud not save", error);

        }

    })

    return (
        <Container maxWidth='sm' >
            <Card
                sx={{ p: 2 }}
            >
                <form onSubmit={onSubmit}>
                    <Stack spacing={3}>

                        <Typography variant="h5" fontWeight="600">
                            Add product
                        </Typography>
                        <Stack spacing={2}>
                            <RHFTextfield name='pname' label="Product Name" control={control} />
                            <RHFTextfield name='price' label="Price" control={control} />
                            <RHFTextfield name='description' label="Description" control={control} />
                        </Stack>
                        <Stack alignItems="center" spacing={2}>
                            <Avatar
                                // src={}
                                variant="rounded"
                                sx={{ width: 160, height: 160 }}
                            >
                            </Avatar>

                            <Typography variant="subtitle2">
                                JPG, PNG, GIF allowed
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                            >
                                Upload Image
                                <RHFImageUpload name='image' control={control} type={"file"} accept={"image/*"} />
                            </Button>

                        </Stack>

                        <Button
                            type="submit"
                            size='large'
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            Add Product
                        </Button>
                    </Stack>
                </form>

            </Card>
        </Container >
    )
}