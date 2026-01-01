// @ts-nocheck
import React, { useContext, useState } from "react";
import { Filter } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  const { state } = useContext(AppContext);
  const [filters, setFilters] = useState({ category: "", priceRange: "", color: "" });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = state.products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.priceRange === "under500" && product.offerPrice >= 500) return false;
    if (filters.priceRange === "500-1000" && (product.offerPrice < 500 || product.offerPrice > 1000)) return false;
    if (filters.priceRange === "above1000" && product.offerPrice <= 1000) return false;
    if (filters.color && product.color !== filters.color) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Sarees</h1>
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>
      <div className="flex gap-6">
        <div className={`${showFilters ? "block" : "hidden"} lg:block w-64 bg-white p-4 rounded-lg shadow h-fit`}>
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Category</label>
            <select value={filters.category} onChange={(e)=>setFilters({...filters, category: e.target.value})} className="w-full border rounded px-3 py-2">
              <option value="">All Categories</option>
              <option value="Soft Silk">Soft Silk</option>
              <option value="Vairaoosi Silk">Vairaoosi Silk</option>
              <option value="Kanjivaram">Kanjivaram</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Price Range</label>
            <select value={filters.priceRange} onChange={(e)=>setFilters({...filters, priceRange: e.target.value})} className="w-full border rounded px-3 py-2">
              <option value="">All Prices</option>
              <option value="under500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="above1000">Above ₹1000</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Color</label>
            <select value={filters.color} onChange={(e)=>setFilters({...filters, color: e.target.value})} className="w-full border rounded px-3 py-2">
              <option value="">All Colors</option>
              <option value="Peacock Blue">Peacock Blue</option>
              <option value="Maroon">Maroon</option>
              <option value="Green">Green</option>
              <option value="Golden Yellow">Golden Yellow</option>
              <option value="Pink">Pink</option>
            </select>
          </div>
          <button onClick={()=>setFilters({category:'',priceRange:'',color:''})} className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Clear Filters</button>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 mb-4">{filteredProducts.length} products found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p=> <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
