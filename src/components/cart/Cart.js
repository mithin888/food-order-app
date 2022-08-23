import React, { useContext, useState } from "react";

import CartContext from "../context/cart-context";

import Modal from "../interface/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";


const Cart = props => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const addHandler = item => {
    cartContext.addItem({
      ...item,
      amount: 1
    });
  };

  const removeHandler = id => {
    cartContext.removeItem(id);
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(process.env.REACT_APP_ORDERS, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    });
    setDidSubmit(true);
    setIsSubmitting(false);
    cartContext.clearCart();
  };

  const cartItems = cartContext.items.map(item => <CartItem
    key={item.id}
    name={item.name}
    amount={item.amount}
    price={item.price}
    onAdd={addHandler.bind(null, item)}
    onRemove={removeHandler.bind(null, item.id)}
  />
  );

  const modalActions =
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={props.hideCart}>
        Close
      </button>
      {hasItems &&
        <button
          className={classes.button}
          onClick={handleOrder}>
          Order
        </button>}
    </div>;

  const cartModalContent = <React.Fragment>
    <ul
      className={classes['cart-items']}>
      {cartItems}
    </ul>
    <div
      className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout
      onConfirm={submitOrderHandler}
      onCancel={props.hideCart} />}
    {!isCheckout && modalActions}
  </React.Fragment>;

  const isSubmittingContent = <p>Sending Order...</p>;
  const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={props.hideCart}>
        Close
      </button>
    </div>
  </React.Fragment>;

  return (
    <Modal onClick={props.hideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}

      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
