import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

function ProductCard({ product }) {
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
          height: 180,
          width: "100%",
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1, justifyItems: "flex-start" }}>
        <Typography variant="h6">Product: {product.pname}</Typography>

        <Typography variant="body1">Price: {product.price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      <Box sx={{ p: 1 }}>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            // onClick={}
          >
            Add to Cart
          </Button>

          <Button
            variant="contained"
            size="small"
            color="primary"
            // onClick={}
          >
            Proceed to Buy
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default ProductCard;
