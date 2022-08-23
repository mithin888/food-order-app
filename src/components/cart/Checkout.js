import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isZip = value => value.trim().length === 5;

const Checkout = props => {

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    zip: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const zipInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredZip = zipInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredZipIsValid = isZip(enteredZip);
    const enteredCityIsValid = !isEmpty(enteredCity);

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredZipIsValid && enteredCityIsValid;

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      zip: enteredZipIsValid,
      city: enteredCityIsValid
    });

    if (!formIsValid) {

      return;
    }
    // Submit cart data
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formValidity.zip ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Zip Code</label>
        <input ref={zipInputRef} type='text' id='postal' />
        {!formValidity.zip && <p>Please enter a valid zip! (5 characters long)</p>}
      </div>
      <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel</button>
        <button className={classes.submit}>
          Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
