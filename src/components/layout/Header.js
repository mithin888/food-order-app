import { Fragment, useState } from 'react';

import Cart from "../cart/Cart";
import HeaderCartButton from './HeaderCartButton';

import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = props => {

  const [cart, showCart] = useState(false);

  const showCartHandler = () => {
    showCart(true);
  };

  const hideCartHandler = () => {
    showCart(false);
  };

  return (
    <Fragment>
      {cart && <Cart hideCart={hideCartHandler} />}
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={showCartHandler} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;