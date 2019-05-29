import React from "react";

const Input = ({ name, label, value, errors, type, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} />
      {label}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
