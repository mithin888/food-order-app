import { useState, useRef } from "react";

import Input from "../interface/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = props => {

  const [amountIsValid, setAmount] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;

    if (
      enteredAmount.trim().length === 0 || +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setAmount(false);
      return;
    }
    props.onAddToCart(+enteredAmount);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          max: '5',
          step: '1',
          defaultValue: '1'
        }} />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;