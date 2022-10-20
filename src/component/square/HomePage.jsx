import { useEffect } from "react";

const Square = (props) => {
  useEffect(() => {}, [props.value]);
  return (
    <button className={props.propsClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
};
export default Square;
