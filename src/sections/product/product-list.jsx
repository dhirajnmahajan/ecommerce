import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";

// import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/products-api/productsApi";
import { ProductContext } from "../../auth/productContext/product-context";
import ProductCard from "../../components/productCard/product-card";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext/createAuthContext";

function ProductList() {
  const navigate = useNavigate();

  const { authenticated, logoutUser } = useContext(AuthContext);
  const { product, setProduct } = useContext(ProductContext);

  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      // console.log(response);

      setProduct(response);
    } catch (error) {
      console.log("failed at product loading", error);
    }
  };

  const handleCart = () => {
    navigate("/cart");
  };
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchItem), 500);
    return () => clearTimeout(t);
  }, [searchItem]);

  const filteredProduct = product.filter((item) => {
    const nameMatch = item.pname
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return nameMatch;
  });

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Box>
            {!authenticated ? (
              <Button variant="outlined" onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
          <Box>
            <Button variant="contained" onClick={handleCart}>
              Cart
            </Button>
          </Box>
        </Stack>

        <Stack mt={3} direction="row" spacing={2} justifyContent="center">
          <TextField
            value={searchItem}
            placeholder="Search products..."
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </Stack>
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ p: 2, m: 2 }}
        >
          {filteredProduct?.map((item, index) => (
            <Grid
              item
              key={`${item.id}-${index}`}
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
