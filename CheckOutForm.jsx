import * as React from "react";
import {useState} from 'react'
import "./CheckOutForm.css";
import Sidebar from "../Sidebar/Sidebar";

export default function CheckOutForm({ cartItems, onAdd, onRemove, setCartItems }) {
  const[name, setName]= useState('')
  const[email, setEmail] = useState('')
  const[checkOut, setCheckOut] = useState(false)
  //Get total price by looping through the cartItems array and accumulating the total of thee quantity * price
  const itemsPrice = cartItems.reduce(
    (total, currentItem) => total + currentItem.price * currentItem.qty,
    0
  )
  const taxPrice = itemsPrice * 0.14;
  const totalPrice= itemsPrice + taxPrice;
  const noCartItems = !cartItems || !cartItems.length;

  function handleCheckOut(){
    // Set Checkout to true when check out button is clicked to display receipt
    setCheckOut(true)
    setReceiptItems(cartItems)
    // And then clear the cart

  }
  //Set CartItems to empty to clear the sidebar and make cart empty
  function endTransaction(){
    setCartItems([])
    setCheckOut(false)
  }

  //Receipt information
  function CheckoutDetails() {
    return (
      <div>
        <p>Receipt for {name} at {email}</p>
        <ul>
          {cartItems.map((each) =>(
            <li>{each.qty} total {each.name} purchased at a cost of ${each.price} each. </li>
          ))}
          <li>Before take, the subtotal was ${itemsPrice.toFixed(2)} </li>
          <li>Total cost including taxes: ${totalPrice.toFixed(2)} </li>
        </ul>
        <button
        onClick={endTransaction}
        >Exit</button>
      </div>
    )
  }

  return (
    <div className=" col-1">
      <h2>Shopping Cart</h2>
      {/* If Cart Item is empty, dispaly info */}
      <div>{noCartItems ? <div>Cart Is Empty</div> : null}</div>
      {cartItems.map((item) => {
        return (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
            </div>
            <div className="col-2 text_right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
            <div className='col-2'>
              ${(item.qty * item.price).toFixed(2)}
            </div>
          </div>
        );
      })}
      {/* iIf cartItems is not empty then display Cart Items information*/}
      {cartItems.length !== 0 &&(
        <>
        <hr></hr>
        <div className='row'>
          <div className='col-2'>Items Price: </div>
          <div className='col-1 text_right'>${itemsPrice.toFixed(2)}</div>
        </div>
        <div className='row'>
          <div className='col-2'>Tax Price: </div>
          <div className='col-1 text_right'>${taxPrice.toFixed(2)}</div>
        </div>
        <div className='row'>
          <div className='col-2'><strong>Total Price: </strong></div>
          <div className='col-1 text_right'><strong>${totalPrice.toFixed(2)}</strong></div>
        </div>
        <hr></hr>
        Name: <input
        placeholder='Enter Name'
        onChange={(e) => setName(e.target.value)}
        /><br/>
        Email:<input
        type='email'
        placeholder='Enter Email'
        onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>
        { name !='' && email !='' ? <button
        onClick={handleCheckOut}
        className='checkOut-btn'
        >CheckOut</button>: null}
        </>

      )}
      <hr></hr>
      <p><strong>Check Out Info</strong></p>
      {checkOut === true ? <CheckoutDetails />: null}
    </div>
  );
}
