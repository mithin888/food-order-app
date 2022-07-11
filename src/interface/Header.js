import React from "react";

import Button from "./Button";
import CartIcon from './CartIcon';

import styles from "./Header.module.css";
import cartStyles from "./HeaderCartButton.module.css";
import image from "./meals.jpg";


const Header = () => {

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button className={cartStyles.button}>
          <CartIcon /> Cart
        </button>
      </header>
      <div className={styles.main}>
        <img src={image} alt="meal"></img>
      </div>

    </React.Fragment>
  );
};

export default Header;