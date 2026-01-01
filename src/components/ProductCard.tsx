// @ts-nocheck
import React, { useContext } from "react";
import { Star } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { dispatch, setCurrentPage, setSelectedProduct } = useContext(AppContext);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const handleViewDetails = () => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };
  const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer overflow-hidden" onClick={handleViewDetails}>
      <div className="relative">
        <img src={product.thumbnail} alt={product.name} className="w-full h-64 object-cover" />
        {discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">{discount}% OFF</span>}
        {product.isNew && <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">NEW</span>}
        {product.isHot && <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">HOT</span>}
        {product.isOffer && <span className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 text-xs font-bold rounded">OFFER</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-green-600">₹{product.offerPrice}</span>
          <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
        </div>
        <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded hover:from-red-700 hover:to-red-800 transition font-semibold">Add to Cart</button>
      </div>
    </div>
  );
}
