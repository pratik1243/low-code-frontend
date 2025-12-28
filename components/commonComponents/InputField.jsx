"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  marginBottom,
  type = "text",
  label,
  name,
  value,
  startIcon,
  placeholder,
  required,
  onChange,
  validationSchema,
  setValue,
  errorProps,
  passwordBtn,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onFieldChange = (e) => {
    const { value } = e.target;

    if (value == "") {
      errorProps?.setErrors((prev) => {
        return {
          ...prev,
          [name]: validationSchema?.errors[name]?.message[0],
        };
      });
    } else if (!validationSchema?.errors[name]?.regex.test(value)) {
      errorProps?.setErrors((prev) => {
        return {
          ...prev,
          [name]: validationSchema?.errors[name].optional
            ? {
                optional: true,
                message: validationSchema?.errors[name]?.message[1],
              }
            : validationSchema?.errors[name]?.message[1],
        };
      });
    } else {
      errorProps?.setErrors((prev) => {
        return {
          ...prev,
          [name]: "",
        };
      });
    }

    setValue((prev) => {
      return { ...prev, [name]: value };
    });
    onChange && onChange(e);
  };

  return (
    <div className={`input-field ${marginBottom ? "mb-3" : ""} float-label`}>
      <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>
      <input
        type={passwordBtn ? (showPassword ? "text" : "password") : type}
        id={name}
        autoComplete="off"
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onFieldChange(e)}
      />
      {startIcon && <div className="start-input-icon">{startIcon}</div>}
      {passwordBtn && (
        <div
          role="button"
          className="password-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
      {errorProps?.errors[name] && (
        <span className="error-message">
          &nbsp;{errorProps?.errors[name]?.optional ? errorProps?.errors[name].message : errorProps?.errors[name]}
        </span>
      )}
    </div>
  );
};

export default InputField;
