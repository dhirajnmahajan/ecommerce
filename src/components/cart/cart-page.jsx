import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { addOrder } from "../../api/orders-api/orderApi";
import { AuthContext } from "../../auth/authContext/createAuthContext";
import { CartContext } from "../../auth/cartContext/cart-context";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const { user, authenticated, isKycApprove } = useContext(AuthContext);

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!authenticated) {
      navigate("/login");
      alert("Login to placed order");
      return;
    }

    if (!isKycApprove) {
      navigate("/review");
      alert("Kyc is pending");
      return;
    }

    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    try {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        await addOrder({
          userId: user.id,
          productId: item.id,
          productName: item.pname,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        });
      }

      alert("Order placed successfully");

      setCart([]);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 3 }}>
        Cart
      </Typography>

      {cart.map((item) => (
        <Card key={item.id} sx={{ p: 2, mt: 2 }}>
          <Typography>Product name : {item.pname}</Typography>
          <Typography>Price : Rs.{item.price}</Typography>
          <Typography>Quantity: {item.quantity}</Typography>
        </Card>
      ))}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Total: Rs.{total}</Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
}
