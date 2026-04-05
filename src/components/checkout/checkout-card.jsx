import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { CheckOutDetails } from "./checkout-details";
import { useContext } from "react";
import { ProductContext } from "../../auth/productContext/product-context";
import { useParams } from "react-router-dom";
// import { getProducts } from "../../api/products-api/productsApi";

export const CheckOutCard = () => {
  const { product } = useContext(ProductContext);
  //   console.log("products:", product);

  const { id } = useParams();
  //   console.log("id:", id);

  const targetProduct = product.find((p) => p.id === id);
  //   console.log("targetProduct:", targetProduct);

  return (
    <Container maxWidth="sm" mt="2">
      <Card sx={{ p: 2 }}>
        <Stack>
          <Typography variant="h5"> Product Details</Typography>
        </Stack>
        <Stack>
          <CheckOutDetails title={"Product Name"} value={targetProduct.pname} />
          <CheckOutDetails title={"Price"} value={targetProduct.price} />
          <CheckOutDetails
            title={"Description"}
            value={targetProduct.description}
          />
        </Stack>
        <Box>
          <Stack display="flex" alignContent="flex-end">
            <Button variant="contained"> Place Order</Button>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
};
