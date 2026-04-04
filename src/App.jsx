import Register from "./sections/auth/register";
// import ProductProvider from "./auth/productContext/product-provider";
// import ProductList from "./sections/product/product-list";
// import ProductNewEditForm from "./sections/product/product-new-edit-form";
import AuthProvider from "./auth/context/authProvider";

function App() {
  return (
    <>
      <h1>Hello Dhiraj</h1>
      {/* <ProductNewEditForm /> */}
      <AuthProvider>
        <Register />
      </AuthProvider>
      {/* <ProductProvider >
        <ProductList />
      </ProductProvider> */}
    </>
  );
}

export default App;
