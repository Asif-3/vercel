// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Truck } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { state, setCurrentPage } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    { title: "Factory Direct Elampillai Silk Sarees", subtitle: "Wholesale & Retail | Starting ₹599", bg: "from-red-900 to-red-700" },
    { title: "Bridal Collection Under ₹2000", subtitle: "Premium Kanjivaram & Soft Silk", bg: "from-green-900 to-green-700" },
    { title: "Weaving Mistake Offers", subtitle: "Upto 50% Off | Limited Stock", bg: "from-blue-900 to-blue-700" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const todayOffers = state.products.filter(p => p.isOffer || p.offerPrice < 700);
  const weddingSpecials = state.products.filter(p => p.subcategory === "Bridal" || p.subcategory === "Wedding Special");

  return (
    <div>
      <div className="relative h-72 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center justify-center text-white`}>
              <div className="text-center px-4">
                <h2 className="text-3xl lg:text-5xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg lg:text-xl mb-4">{slide.subtitle}</p>
                <button onClick={() => setCurrentPage("products")} className="bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition">Shop Now</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"><ChevronLeft className="w-6 h-6 text-white" /></button>
        <button onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"><ChevronRight className="w-6 h-6 text-white" /></button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Today's Live Offers 🔥</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayOffers.slice(0,3).map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Wedding Specials 💍</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingSpecials.slice(0,3).map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
