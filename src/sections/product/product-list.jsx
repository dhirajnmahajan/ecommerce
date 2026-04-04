import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useContext } from "react";

// import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/products-api/productsApi";
import { ProductContext } from "../../auth/productContext/product-context";
import ProductCard from "../../components/productCard/product-card";

function ProductList() {
  //   const navigate = useNavigate();
  const { product, setProduct } = useContext(ProductContext);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      // console.log(response);

      setProduct(response);
    } catch (error) {
      console.log("failed to load the products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ p: 2, m: 2 }}
        >
          {product?.map((item) => (
            <Grid
              item
              key={item.id}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ display: "flex" }}
            >
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ProductList;
