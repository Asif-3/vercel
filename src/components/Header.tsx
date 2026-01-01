// @ts-nocheck
import React, { useContext } from "react";
import { Menu, Phone, ShoppingCart, User } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const { state, setCurrentPage, setShowCart, showMobileMenu, setShowMobileMenu } = useContext(AppContext);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="bg-red-950 py-1 text-xs text-center">
        <span className="inline-flex items-center gap-2">
          <Phone className="w-3 h-3" />
          Call/WhatsApp: {state.settings.whatsappNumber} | Direct from Weavers
        </span>
      </div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="cursor-pointer" onClick={() => setCurrentPage("home")}>
              <h1 className="text-xl lg:text-2xl font-bold">Elampillai Sarees A to Z</h1>
              <p className="text-xs text-red-200">Harshal Textiles - Factory Direct</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setCurrentPage("home")} className="hover:text-yellow-300 transition">Home</button>
            <button onClick={() => setCurrentPage("products")} className="hover:text-yellow-300 transition">All Sarees</button>
            <button onClick={() => setCurrentPage("orders")} className="hover:text-yellow-300 transition">My Orders</button>
            {state.user?.role === "admin" && <button onClick={() => setCurrentPage("admin")} className="hover:text-yellow-300 transition">Admin</button>}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCart(true)} className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-sm">{state.user?.name || "Guest"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
