import { useData, useAuth } from "../../Contexts";
import { CartCard } from "../../Components";
import { getOrderId, isOrderComplete } from "../../services/orderServices";
import { API_URL, RAZORPAY_KEY_ID } from "../../utils/constants";
import "./Cart.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../../services/dataServices";

export function Cart() {
  const { itemsInCart, dispatch } = useData();
  const { currentUser } = useAuth();
  console.log(currentUser);

  const [orderPlaced, setOrderPlaced] = useState(false);
  let total = 0;
  const placeOrder = async () => {
    const response = await getOrderId(total);
    console.log(response.data.data);
    if (response.data.success) {
      const { amount, currency, id } = response.data.data;
      var options = {
        key: RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "NFTbazaar",
        description: "Test Transaction",
        image:
          "https://media.tenor.com/images/449aef0684213672f2884707ea8ba1ce/tenor.gif",
        order_id: id,
        handler: async function (response) {
          console.log(response);
          console.log(currentUser);
          const res = await clearCart(currentUser.userId);
          if (res.data.success) {
            setOrderPlaced(true);
            dispatch({ type: "RESET_CART" });
            setTimeout(() => setOrderPlaced(false), 4000);
          }
        },
        prefill: {
          name: "Test Kumar",
          email: "test.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#d81159",
        },
      };
      console.log(options);
      console.log(Razorpay);
      var rzp1 = new Razorpay(options);
      await rzp1.open();
    }
  };
  return (
    <>
      {console.log(orderPlaced)}
      {orderPlaced && (
        <div>
          <div className="modal-bg modal-bg-active">
            <div className="modal">
              <h2 className="modal-message">
                Your Order has been placed successfully.🛒
              </h2>
              <p className="modal-description">Thanks for shopping with us!</p>
            </div>
          </div>
        </div>
      )}
      {itemsInCart.length === 0 ? (
        <div className="empty-cart">
          <h1>Cart is Empty🛒</h1>
          <Link to="/products" className="link">
            <button className="btn btn-primary">Browse Products</button>
          </Link>
        </div>
      ) : (
        <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
          {itemsInCart.map((item) => (
            <CartCard key={item._id} product={item} />
          ))}
        </div>
      )}

      <div className="cart-details">
        <ol>
          {itemsInCart.map(({ name, quantity, price, id }) => {
            total = total + price * quantity;
            return (
              <li key={id}>
                <div>
                  <p>
                    {name} x {quantity} = {price * quantity}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        {total > 0 && (
          <div className="cart-details">
            <h2>Total amount: {total}</h2>

            <button className="btn btn-primary" onClick={placeOrder}>
              Place Order
            </button>
            <h3>Use 4111 1111 1111 1111 as the dummy card no.</h3>
          </div>
        )}
      </div>
    </>
  );
}
