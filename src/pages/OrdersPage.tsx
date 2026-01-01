// @ts-nocheck
import React, { useContext } from "react";
import { Package, ShoppingCart, Truck, Check, X } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function OrdersPage() {
  const { state, setCurrentPage } = useContext(AppContext);
  const getStatusInfo = (status) => {
    const statusMap = {
      PLACED: { label: "Order Placed", color: "bg-blue-500", icon: ShoppingCart },
      PACKED: { label: "Packed at Elampillai", color: "bg-purple-500", icon: Package },
      SHIPPED: { label: "Shipped", color: "bg-yellow-500", icon: Truck },
      OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "bg-orange-500", icon: Truck },
      DELIVERED: { label: "Delivered", color: "bg-green-500", icon: Check },
      CANCELLED: { label: "Cancelled", color: "bg-red-500", icon: X }
    };
    return statusMap[status] || statusMap.PLACED;
  };
  const statusOrder = ["PLACED","PACKED","SHIPPED","OUT_FOR_DELIVERY","DELIVERED"];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {state.orders.length===0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-4">No orders yet</p>
          <button onClick={()=>setCurrentPage('products')} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Start Shopping</button>
        </div>
      ) : (
        <div className="space-y-6">
          {state.orders.map(order=>{
            const statusInfo = getStatusInfo(order.status);
            const currentStepIndex = statusOrder.indexOf(order.status);
            return (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-6">
                  <div><h3 className="font-bold text-lg">Order ID: {order._id}</h3><p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p></div>
                  <div className="text-right"><p className="text-2xl font-bold text-green-600">₹{order.total}</p><span className={`inline-block ${statusInfo.color} text-white px-3 py-1 rounded text-sm mt-2`}>{statusInfo.label}</span></div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Order Tracking</h4>
                  <div className="flex justify-between items-center">
                    {statusOrder.map((status, idx)=>{
                      const info = getStatusInfo(status);
                      const Icon = info.icon;
                      const isCompleted = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div key={status} className="flex-1 flex flex-col items-center relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? info.color : 'bg-gray-200'} text-white mb-2 z-10`}><Icon className="w-6 h-6" /></div>
                          <p className={`text-xs text-center ${isCurrent ? 'font-bold' : ''}`}>{info.label}</p>
                          {idx < statusOrder.length - 1 && <div className={`absolute top-6 left-1/2 w-full h-1 ${idx < currentStepIndex ? info.color : 'bg-gray-200'}`} style={{zIndex:0}} />}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center"><strong>What does this mean?</strong> Your order is currently at the "{statusInfo.label}" stage.</p>
                </div>
                <div className="border-t pt-4"><h4 className="font-semibold mb-3">Items</h4><div className="space-y-2">{order.items.map(item=><div key={item._id} className="flex items-center gap-4"><img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded" /><div className="flex-1"><p className="font-semibold">{item.name}</p><p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.offerPrice}</p></div></div>)}</div></div>
                <div className="border-t pt-4 mt-4"><h4 className="font-semibold mb-2">Delivery Address</h4><p className="text-gray-700">{order.address.name}<br />{order.address.addressLine}<br />{order.address.city}, {order.address.state} - {order.address.pincode}<br />Phone: {order.address.phone}</p></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
