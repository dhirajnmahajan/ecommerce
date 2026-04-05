import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../sections/auth/register";
import { CheckOutCard } from "../components/checkout/checkout-card";
import ProductList from "../sections/product/product-list";
import Login from "../sections/auth/login";
import KycUnderReviewCard from "../components/underReview/kyc-pending-card";
import AuthGuard from "./authGuard/auth-guard";
import CheckoutPage from "../components/checkout/checkoutPage";
import CartPage from "../components/cart/cart-page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<KycUnderReviewCard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout/:id"
          element={
            <AuthGuard>
              <CheckoutPage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
