import React from "react";
import "./square.component.scss";

const Square = ({ value, onClick }) => {
  return (
    <button className={"square"} onClick={onClick}>
      <i className={value}>{value}</i>
    </button>
  );
};

export default Square;
