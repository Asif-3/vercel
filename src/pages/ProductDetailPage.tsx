// @ts-nocheck
import React, { useContext, useState } from "react";
import { ChevronLeft, Star, Heart, Plus, Minus } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage() {
  const { state, dispatch, selectedProduct, setCurrentPage } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  if (!selectedProduct) return null;
  const handleAddToCart = () => {
    for (let i=0;i<quantity;i++) dispatch({type:'ADD_TO_CART', payload: selectedProduct});
    alert('Added to cart!');
  };
  const similarProducts = state.products.filter(p=>p.category===selectedProduct.category && p._id !== selectedProduct._id).slice(0,3);
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={()=>setCurrentPage('products')} className="flex items-center gap-2 text-red-600 mb-6 hover:underline"><ChevronLeft className="w-4 h-4" /> Back to Products</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div><img src={selectedProduct.thumbnail} alt={selectedProduct.name} className="w-full rounded-lg shadow-lg" /></div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">{[...Array(5)].map((_,i)=><Star key={i} className={`w-5 h-5 ${i<Math.floor(selectedProduct.rating)?'fill-current':''}`} />)}</div>
            <span className="text-gray-600">({selectedProduct.rating} rating)</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-green-600">₹{selectedProduct.offerPrice}</span>
            <span className="text-xl text-gray-500 line-through">₹{selectedProduct.price}</span>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6"><p className="text-green-700 font-semibold">✓ In Stock ({selectedProduct.stock} pieces available)</p></div>
          <div className="mb-6"><h3 className="font-bold mb-2">Product Details:</h3><ul className="space-y-2 text-gray-700"><li><strong>Category:</strong> {selectedProduct.category}</li><li><strong>Fabric:</strong> {selectedProduct.fabric}</li><li><strong>Color:</strong> {selectedProduct.color}</li><li><strong>Pattern:</strong> {selectedProduct.pattern}</li><li><strong>Blouse:</strong> Included</li><li><strong>Wash Care:</strong> Dry clean recommended</li></ul></div>
          <div className="mb-6"><h3 className="font-bold mb-2">Description:</h3><p className="text-gray-700">{selectedProduct.description}</p></div>
          <div className="flex items-center gap-4 mb-6"><label className="font-semibold">Quantity:</label><div className="flex items-center border rounded"><button onClick={()=>setQuantity(Math.max(1, quantity-1))} className="px-4 py-2 hover:bg-gray-100"><Minus className="w-4 h-4" /></button><span className="px-6 py-2 border-x">{quantity}</span><button onClick={()=>setQuantity(quantity+1)} className="px-4 py-2 hover:bg-gray-100"><Plus className="w-4 h-4" /></button></div></div>
          <div className="flex gap-4"><button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition font-bold">Add to Cart</button><button className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50"><Heart className="w-6 h-6" /></button></div>
        </div>
      </div>
      {similarProducts.length>0 && (<div><h2 className="text-2xl font-bold mb-6">Similar Sarees</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{similarProducts.map(p=> <ProductCard key={p._id} product={p} />)}</div></div>)}
    </div>
  );
}
