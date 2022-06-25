import * as React from "react";
import { useState } from "react";
import "./Products.css";

export default function Products({ productsData, onAdd }) {
  return productsData.map((product) => (
    <Product onAdd={onAdd} product={product} />
  ));
}
export function Product({ product, onAdd }) {
  const [clicked, setClicked] = useState(false);
  function clickedd() {
    setClicked(true);
  }
  function HandleOverview({ product }) {
    return <div className="product_Overview">
      <div className='closeOverview-div'>
        <button
        className='closeOverview'
        onClick={() =>{setClicked(false)}}
        >X</button>
      </div>
      <div className='overview-image'>
        <img src={product.image}/>
      </div>
      <div className='overview-text'>
          <p><strong>{product.name}</strong></p>
          <p>{product.description}</p>
      </div>
    </div>;
  }
  return (
    <div className="product">
      <img
        className="product-img"
        key={product.id}
        src={product.image}
        onClick={() => clickedd()}
      />
      <div className="productContainer">
        <p>{product.name}</p>
        <p>${product.price.toFixed(2)}</p>
        <button className="Cart" onClick={() => onAdd(product)}>
          Add To Cart
        </button>
      </div>
      {clicked ? <HandleOverview product={product} /> : null}
    </div>
  );
}
