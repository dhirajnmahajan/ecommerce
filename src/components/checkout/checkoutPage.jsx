import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../auth/productContext/product-context";
import { AuthContext } from "../../auth/authContext/createAuthContext";
import { addOrder } from "../../api/orders-api/orderApi";
import { getProducts, updateProduct } from "../../api/products-api/productsApi";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, setProduct } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const [targetProduct, setTargetProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product.length) {
      getProducts().then((data) => setProduct(data));
    }
  }, []);

  useEffect(() => {
    const found = product.find((p) => p.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTargetProduct(found);
  }, [product, id]);

  if (!targetProduct) return <div>Loading...</div>;

  const handlePlaceOrder = async () => {
    if (quantity < 0 || quantity === 0) {
      alert("select at least one ");
      return;
    }

    if (quantity > targetProduct.quantity) {
      alert("Not enough stock available");
      return;
    }

    try {
      //  Create order
      const orderData = {
        userId: user.id,
        userEmail: user.email,
        productId: targetProduct.id,
        productName: targetProduct.pname,
        price: targetProduct.price,
        quantity,
        total: quantity * targetProduct.price,
      };

      await addOrder(orderData);
      alert("Order placed successfully");

      const remainingQuantity = targetProduct.quantity - quantity;

      await updateProduct(targetProduct.id, {
        quantity: remainingQuantity,
      });

      navigate("/");
    } catch (error) {
      console.log("order failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5">Checkout</Typography>

        <Grid
          container
          spacing={3}
          //   justifyContent="space-around"
          alignItems="center"
        >
          <Grid item sm={12} md={6}>
            <Box
              component="img"
              src={targetProduct.image}
              sx={{ width: "100%", height: 120, objectFit: "cover", mt: 2 }}
            />
          </Grid>
          <Grid item sm={12} md={6} spacing={2}>
            <Typography>Name: {targetProduct.pname}</Typography>
            <Typography>Price: Rs.{targetProduct.price}</Typography>
            <Typography>Description:{targetProduct.description}</Typography>
            <Typography>Available: {targetProduct.quantity}</Typography>
          </Grid>
        </Grid>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          sx={{ mt: 2 }}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Card>
    </Container>
  );
}
