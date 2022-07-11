

const Button = (props) => {

  return (
    <button className={props.styles}>
      {props.children}
    </button>
  );
};

export default Button;