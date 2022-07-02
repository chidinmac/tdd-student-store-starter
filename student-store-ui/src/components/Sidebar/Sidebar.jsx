import * as React from "react";
import { useState } from "react";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import "./Sidebar.css";

export default function Sidebar({
  btn_status,
  setbtn_status,
  onAdd,
  cartItems,
  onRemove,
  setCartItems
}) {

  let cnt = 0;
  const [isActive, setActive] = useState("false");
  //When button is clicked set button status to visible, which makes the sidebar open, also set isActive to true
  //If the  button is already open, close it by reseting setting isActive to false
  function handleOnClick() {
    setbtn_status("visible");
    setActive("true");
    cnt++;
    if (cnt > 1) {
      cnt = 0;
      setActive("false");
    }
  }
  return (
    <section className={isActive == "true" ? btn_status : null} id={"sidebar"}>
      <div className="sidebar-btn" id={btn_status} onClick={handleOnClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isActive == "true" ? (
        <CheckOutForm
        onAdd={onAdd}
        cartItems={cartItems}
        onRemove={onRemove}
        setCartItems={setCartItems}
        />
      ) : null}
    </section>
  );
}
