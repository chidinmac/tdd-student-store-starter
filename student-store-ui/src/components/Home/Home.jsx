import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Products from "../Products/Products";
import "./Home.css";

export default function Home({
  subnavLinks,
  productsData, // has all the products data initially
  allProducts, // should have all the products data
  setProductsData,
  onAdd,
}) {

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchInput, setSearchInput] = useState("");

  //Runs When input text changes
  const searchItems = (searchValue) => {

    if (searchValue === "") {
      setProductsData(allProducts);
    } else {
      setSearchInput(searchValue);
      const filteredSearch = allProducts.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setProductsData(filteredSearch);
      if (filteredSearch === []) {
        <p>No Results Found</p>;
      }
    }
  };

  // Runs whenever selectedCategory changes
  useEffect(() => {
    function filterProducts() {
      // If all categories
      if (selectedCategory === "All Categories") {
        setProductsData(allProducts);
        return;
      }
      // Filter from all products
      let newproductsData = allProducts.filter((info) => {
        return info.category == selectedCategory.toLowerCase();
      });
      setProductsData(newproductsData);
    }
    filterProducts();
  }, [selectedCategory]);

  return (
    <div className="home">
      <div className="intro-div">
        <div className="blah">
          <h1>
            <p>WELCOME!</p>
            <p>Shop our Merch!</p>
          </h1>
          <p>We have all kinds of goodies for you.</p>
          <p>Click the Add to Cart button to start filling your merch</p>
          <p>Checkout when you're ready and your items will come to</p>
          <p>door steps. Click Items for more details. Enjoy!</p>
        </div>

        <span>
          <img
          src='https://img.freepik.com/free-photo/woman-s-hand-holds-shopping-bags-sign-that-says-go-shopping-concept-shopping-shopaholism_431724-3647.jpg'>
          </img>
        </span>
      </div>
      <div className="mini-nav">
        <strong>Search...</strong>
        <input
          type="text"
          id="inputValue"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <div className="sub-navbar">
        <Sub_navlinks
          subnavLinks={subnavLinks}
          setProductsData={setProductsData}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="products">
        {<Products onAdd={onAdd} productsData={productsData} />}
      </div>
      <div className="aboutUs">
        <h2>About Us</h2>
        <div className="ourInfo">
          <div className="text">
            <p>
              The codepath student store offers great
              <br />
              products at great prices from a great team
              <br />
              and for a great cause.
              <br />
            </p>
            <p>
              We've searched far and wide for items
              <br />
              that perk the interests of even the most
              <br />
              eccentric students and decided to offer
              <br />
              them all here in one place.
            </p>
            <p>
              All proceeds go towards bringing high
              <br />
              quality CS education to college students
              <br />
              around the country.
              <br />
            </p>
          </div>
          <div className="media">
            <img src="https://img.freepik.com/free-vector/about-us-website-banner-concept-with-thin-line-flat-design_56103-96.jpg?w=2000" />
          </div>
        </div>
      </div>
      <div className='contactUs'>
        <h2>Contact Us</h2>
        <div className='contacts'>
          <div className='ourContact'>
            <p>Email: studentstore@gmail.com</p>
            <p>Phone Contact: studentstore@gmail.com</p>
            <p>Address: 1, Hacker Way, San Francisco, CA</p>
          </div>
          <h2><strong>Reach Out To Us!!!</strong></h2>
        </div>
      </div>
    </div>
  );
}
export function Sub_navlinks({
  subnavLinks,
  setProductsData,
  setSelectedCategory,
}) {
  return (
    <ul className="sub-navlinks">
      {subnavLinks.map((link) => (
        <Sub_navLink
          key={link.label}
          subnavLink={link}
          setProductsData={setProductsData}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </ul>
  );
}
export function Sub_navLink({
  subnavLink,
  setProductsData,
  setSelectedCategory,
}) {
  function handleLabelClick() {
    setSelectedCategory(subnavLink.label);
  }
  return (
    <li className="sub-navLink" onClick={handleLabelClick}>
      {subnavLink.label}{" "}
    </li>
  );
}
