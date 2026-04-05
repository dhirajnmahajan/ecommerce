import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext/createAuthContext";
import { CartContext } from "../../auth/cartContext/cart-context";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isKycApprove } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleBuy = () => {
    if (isKycApprove) {
      navigate(`/checkout/${product.id}`);
    } else {
      navigate("/review");
    }
  };

  const handleAddToCart = () => {
    addToCart(product);

  };
  return (
    <Card
      sx={{
        width: "100%",
        // maxWidth: 360,
        // height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        sx={{
          height: 140,
          width: "100%",
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1, justifyItems: "flex-start" }}>
        <Typography variant="h6" fontWeight={600}>
          Product: {product.pname}
        </Typography>

        <Typography variant="body1">Price: {product.price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      <Box sx={{ p: 1, m: "auto" }}>
        <CardActions>
          <Button variant="outlined" size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleBuy}
          >
            Proceed to Buy
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default ProductCard;
