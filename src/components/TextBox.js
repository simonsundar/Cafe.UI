import React from 'react';

const TextBox = ({ label, value, onChange, placeholder, maxLength, minLength, required }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
      />
      {maxLength && <small>{`${value.length}/${maxLength} characters`}</small>}
    </div>
  );
};

export default TextBox;
