import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./OrderHistory.css";
const URL = "http://localhost:3001/store/purchases";

export default function OrderHistory() {
  const [orderClicked, setOrderClicked] = useState(false);
  const [PurchasesData, setPurchasesData] = useState([]);
  const [allPurchasesData, setAllPurchasesData] = useState([]);
  const [orderDetailsClicked, setOrderDetailsClicked] = useState(false);
  const [eachOrder, setEachOrder] = useState('');

  function orderDetails(order){
    setOrderDetailsClicked(true);
    setEachOrder(order)
  }
  const fetchData = async () => {
    const result = await axios.get(URL);
    setAllPurchasesData(result.data.purchases);
    setPurchasesData(result.data.purchases)
  };

  useEffect(fetchData, []);

  function handleOrders() {
    setOrderClicked(true);
  }
  const  searchOrderHistory = (searchValue) =>{
    if (searchValue == "") {
        setPurchasesData(allPurchasesData);
      } else {

        const filteredSearch = allPurchasesData.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setPurchasesData(filteredSearch);
    }
  }

  return (
    <div className="orderhistory">
      <button id="order-history-button" onClick={handleOrders}>
        {" "}
        My Orders
      </button>
      {orderClicked === true ? (
        <div className="displayOrders">
          <button
            className="closeOrders"
            onClick={() => setOrderClicked(false)}
          >
            X
          </button>
          <h2>Orders</h2>
          <input
            type="text"
            id="inputValue"
            placeholder='Search Orders By name'
            onChange={(e) => searchOrderHistory(e.target.value)}
            />
          <div className='order-heading'>
            <ul>
            <div id='order-heading'>
            <li className="each-order"><strong>Names</strong></li>
            <li className="each-order"><strong>Email</strong></li>
            <li className="each-order"><strong>Total Prices</strong></li>
            </div>
            </ul>
        </div>
          <div className="Orders">
            <ul>
            {PurchasesData.map((eachPurchase) => (
              <div key={eachPurchase.purchaseId} className='mapOrders'>
                <li className="each-order">{eachPurchase.name}</li>
                <li className="each-order">{eachPurchase.email}</li>
                <li className="each-order">${eachPurchase.total_price}</li>
                <li className="each-order"><button
                onClick={() => orderDetails(eachPurchase.order)}
                >Details</button></li>
              </div>
            ))}
        </ul>
        {orderDetailsClicked == true ?

        <div className='display-order-details'>
            <button
            className="closeOrders"
            onClick={() => setOrderDetailsClicked(false)}
            >
            X
          </button>
            <h2>Order Details</h2>
            <div className='order-details'>
            <ul>
                {eachOrder.map((each) => (
                    <li key={each.name}>{each.qty} {each.name} for ${each.price} each</li>
                ))}
            </ul>
            </div>
        </div>: null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
