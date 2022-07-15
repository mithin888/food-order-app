import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div
          className={classes.backdrop}
          onClick={props.onClick}
        >
        </div>,
        document.getElementById('overlays'))
      }
      {ReactDOM.createPortal(
        <div
          className={classes.modal}>
          {props.children}
        </div>, document.getElementById('overlays'))}
    </Fragment>


  );
};

export default Modal;