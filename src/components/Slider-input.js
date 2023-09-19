import React from "react";
import FormRange from "react-bootstrap/esm/FormRange";

const Slider = (props) => {
  return (
    <>
      <p>{props.title}</p>
      <span>{props.underLineText}</span>
      <FormRange
        max={props.max}
        min={props.min}
        value={props.value}
        onChange={props.onChange}
      />
      <div
        className="labels"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <label>{props.labelMin}</label>
        <b>₹{props.max / 2}</b>
        <label>{props.labelMax}</label>
      </div>
    </>
  );
};

export default Slider;
