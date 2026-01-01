// @ts-nocheck
import React, { useContext } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function CartDrawer() {
  const { state, dispatch, showCart, setShowCart, setCurrentPage } = useContext(AppContext);
  const updateQuantity = (id, newQty) => {
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id, quantity: newQty } });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  const total = state.cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const handleCheckout = () => {
    setShowCart(false);
    setCurrentPage("checkout");
  };
  if (!showCart) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
      <div className="bg-white w-full max-w-md h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart ({state.cart.length})</h2>
          <button onClick={() => setShowCart(false)}><X className="w-6 h-6" /></button>
        </div>
        {state.cart.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {state.cart.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4">
                  <img src={item.thumbnail} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-green-600 font-bold">₹{item.offerPrice}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 border rounded"><Minus className="w-3 h-3" /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 border rounded"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeItem(item._id)} className="ml-auto text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between mb-4"><span className="text-xl font-bold">Total:</span><span className="text-2xl font-bold text-green-600">₹{total}</span></div>
              <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition font-bold">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
