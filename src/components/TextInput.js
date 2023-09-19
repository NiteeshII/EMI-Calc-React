import React from "react";
import "./TextInput.css";

const TextInput = (props) => {
  return (
    <div className="Textinput-container">
      <input
        type="number"
        title={props.title}
        value={props.state}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInput;
