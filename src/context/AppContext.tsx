// @ts-nocheck
import React, { createContext, useReducer, useState, useEffect } from "react";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";

export const AppContext = createContext({});

const initialState = {
  user: null,
  cart: [],
  products: [],
  orders: [],
  settings: {
    whatsappNumber: "+91 9876543210",
    supportContact: "+91 9876543210",
    minWholesaleQty: 6,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, cart: [], orders: [] };
    case "ADD_TO_CART":
      const exists = state.cart.find((item) => item._id === action.payload._id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item._id !== action.payload) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => (p._id === action.payload._id ? action.payload : p)),
      };
    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter((p) => p._id !== action.payload) };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                statusHistory: [
                  ...order.statusHistory,
                  { state: action.payload.status, timestamp: new Date().toISOString() },
                ],
              }
            : order
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: SAMPLE_PRODUCTS });
    const demoUser = { _id: "user1", name: "Demo User", email: "demo@example.com", role: "user" };
    dispatch({ type: "SET_USER", payload: demoUser });
  }, []);

  const contextValue = {
    state,
    dispatch,
    currentPage,
    setCurrentPage,
    selectedProduct,
    setSelectedProduct,
    showCart,
    setShowCart,
    showMobileMenu,
    setShowMobileMenu,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
