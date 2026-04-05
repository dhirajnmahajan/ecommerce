import Register from "./sections/auth/register";
// import ProductProvider from "./auth/productContext/product-provider";
// import ProductList from "./sections/product/product-list";
// import ProductNewEditForm from "./sections/product/product-new-edit-form";
// import AuthProvider from "./auth/context/authProvider";
import Router from "./routes";
import ProductProvider from "./auth/productContext/product-provider";
import CartProvider from "./auth/cartContext/cart-provider";
import AuthProvider from "./auth/authContext/authProvider";

function App() {
  return (
    <>
      {/* <h1>Hello Dhiraj</h1> */}
      {/* <ProductNewEditForm /> */}
      <CartProvider>
        <ProductProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ProductProvider>
      </CartProvider>
      {/* <ProductProvider >
        <ProductList />
      </ProductProvider> */}
    </>
  );
}

export default App;
