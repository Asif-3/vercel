// @ts-nocheck
import React, { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import CartDrawer from "./components/CartDrawer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}

function InnerApp() {
  const { currentPage, selectedProduct } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        {currentPage === "home" && <HomePage />}
        {currentPage === "products" && <ProductListPage />}
        {currentPage === "product-detail" && selectedProduct && <ProductDetailPage />}
        {currentPage === "checkout" && <CheckoutPage />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "admin" && <AdminDashboard />}
        {currentPage === "admin-products" && <AdminProducts />}
        {currentPage === "admin-orders" && <AdminOrders />}
      </main>
      <CartDrawer />
    </div>
  );
}
