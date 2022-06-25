import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";
const URL = "https://codepath-store-api.herokuapp.com/store";

//Sub Navigation Links array
const subnavLinks = [
  { label: "All Categories" },
  { label: "Clothing" },
  { label: "Food" },
  { label: "Accessories" },
  { label: "Tech" },
];

// Navigation Bar links
const navLinks = [
  { label: "Home" },
  { label: "About Us" },
  { label: "Contact Us" },
  { label: "Buy Now" },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  //Add to cart function
  function onAdd( product) {
    //find if the item exists in the cartItems Array, then increase its quantity
    const exist = cartItems.find(item => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    //If cartItem doesnt exist in cartItems , set the quantity to 1
  }

  //Removing products from the cart function
  function onRemove (product) {
    const exist = cartItems.find(item => item.id === product.id);
    if (exist. qty === 1)
    {
        setCartItems(cartItems.filter((item) => item.id !== product.id))
    }
    else{
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }
  // List of products to be filtered
  const [productsData, setProductsData] = useState([]);

  // List all products
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products
  const fetchData = async () => {
    const response = await fetch(URL);
    const result = await response.json();
    setAllProducts(result.products);
    setProductsData(result.products);
  };

  // Run this once only
  useEffect(fetchData, []);

  //button status in Sidebar Component
  const [btn_status, setbtn_status] = useState("");

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Sidebar
            btn_status={btn_status}
            setbtn_status={setbtn_status}
            onAdd={onAdd}
            onRemove={onRemove}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
          <div className="wrapper">
            <Navbar navLinks={navLinks} />
            <Home
              productsData={productsData}
              setProductsData={setProductsData}
              subnavLinks={subnavLinks}
              allProducts={allProducts}
              onAdd={onAdd}
            />
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}
