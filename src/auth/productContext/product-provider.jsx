import React, { useState } from "react";
import { ProductContext } from "./product-context";

function ProductProvider({ children }) {
  const initialObj = {
    pname: "",
    price: "",
    description: "",
    image: "",
  };

  const [product, setProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ product, setProduct, initialObj }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
