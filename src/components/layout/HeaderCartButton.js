import { useState, useEffect, useContext } from "react";

import CartContext from "../context/cart-context";

import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {

  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const totalCartItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const clickHandler = () => {
    props.onClick();
  };

  // Cart Button Animation
  const [btnBump, setBump] = useState(false);
  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBump(true);
    const timer = setTimeout(() => {
      setBump(false);
    }, 150);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);


  return (
    <button onClick={clickHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;