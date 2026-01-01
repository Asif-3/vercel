// @ts-nocheck
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function CheckoutPage() {
  const { state, dispatch, setCurrentPage } = useContext(AppContext);
  const [address, setAddress] = useState({ name: "", phone: "", addressLine: "", city: "", state: "", pincode: "" });
  const total = state.cart.reduce((sum,item)=> sum + item.offerPrice * item.quantity, 0);
  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.addressLine) { alert('Please fill all address fields'); return; }
    const order = { _id: 'ORD' + Date.now(), items: state.cart, total, address, status: 'PLACED', statusHistory: [{state:'PLACED', timestamp:new Date().toISOString()}], createdAt: new Date().toISOString() };
    dispatch({type:'ADD_ORDER', payload: order});
    dispatch({type:'CLEAR_CART'});
    alert('Order placed successfully! Order ID: ' + order._id);
    setCurrentPage('orders');
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={address.name} onChange={(e)=>setAddress({...address, name: e.target.value})} className="border rounded px-4 py-2" />
              <input type="tel" placeholder="Phone Number" value={address.phone} onChange={(e)=>setAddress({...address, phone: e.target.value})} className="border rounded px-4 py-2" />
              <input type="text" placeholder="Address Line" value={address.addressLine} onChange={(e)=>setAddress({...address, addressLine: e.target.value})} className="md:col-span-2 border rounded px-4 py-2" />
              <input type="text" placeholder="City" value={address.city} onChange={(e)=>setAddress({...address, city: e.target.value})} className="border rounded px-4 py-2" />
              <input type="text" placeholder="State" value={address.state} onChange={(e)=>setAddress({...address, state: e.target.value})} className="border rounded px-4 py-2" />
              <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e)=>setAddress({...address, pincode: e.target.value})} className="border rounded px-4 py-2" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"><input type="radio" name="payment" defaultChecked /> <span>Cash on Delivery</span></label>
              <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"><input type="radio" name="payment" /> <span>UPI / Online Payment (Demo)</span></label>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {state.cart.map(item => <div key={item._id} className="flex justify-between text-sm"><span>{item.name} x {item.quantity}</span><span>₹{item.offerPrice * item.quantity}</span></div>)}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2"><span>Subtotal:</span><span>₹{total}</span></div>
              <div className="flex justify-between mb-2 text-green-600"><span>Shipping:</span><span>FREE</span></div>
              <div className="flex justify-between text-xl font-bold mt-4"><span>Total:</span><span className="text-green-600">₹{total}</span></div>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition font-bold mt-6">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
