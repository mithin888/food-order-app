import { useContext, useState } from "react";

import CartContext from "../context/cart-context";

import Modal from "../interface/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";


const Cart = props => {

  const [isCheckout, setIsCheckout] = useState(false);

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

  return (
    <Modal
      onClick={props.hideCart}
    >
      <ul
        className={classes['cart-items']}>
        {cartItems}
      </ul>
      <div
        className={classes.total}
      >
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.hideCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
