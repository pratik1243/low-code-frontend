"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { addPixel, updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import { IoIosClose } from "react-icons/io";

const SelectField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
  const isWebPage = path.includes("web-page");
  const boxRef = useRef(null);
  const { forms, setForms, breakPoint } = useContext(isWebPage ? PageContext : FormContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const setValidations = (value) => {
    setValue(value);
    setForms({...forms, [breakPoint]: updateNestedForms(forms, ele, value, currentStep, breakPoint) });
  };

  const filterOptions = ele?.props?.options.filter((el) =>
    el.label.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-3 position-relative" ref={boxRef}>
      <div
        className={`element-input-field ${open ? "index-1" : ""} ${
          (ele?.props?.floatLabel || ele?.props?.standard) && isWebPage
            ? "float-label"
            : "normal-input"
        } ${ele?.props?.standard && isWebPage ? "standard-input" : ""}`}
      >
        <label
          style={{
            ...(isWebPage && {
              color: ele?.props?.style?.color,
              backgroundColor: containerBackground
                ? containerBackground
                : ele?.props?.style?.background,
            }),
          }}
          htmlFor={ele?.id}
        >
          {ele?.props?.label || "Enter label"}{" "}
          {ele?.props?.required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          id={ele?.id}
          value={ele?.props?.value || ""}
          className={`${ele?.name} ${ele?.props?.standard ? 'no-standard-border' : ''}`}
          placeholder={ele?.props?.placeholder || "Enter placeholder"}
          onChange={(e) => {
            setValidations(e.target.value);
          }}
          required
          style={{
            ...(ele?.props?.style &&
              isWebPage &&
              addPixel(ele?.props?.style, ele)),
            ...((ele?.props?.standard || ele?.props?.floatLabel) &&
              isWebPage && {
                backgroundColor: "transparent",
              }),
          }}
          onClick={() => {
            setOpen(true);
          }}
        />
        {ele?.props?.standard && isWebPage && (
          <div
            className="standard-line"
            style={{
              ...(isWebPage && {
                backgroundColor: ele?.props?.style?.color,
              }),
            }}
          ></div>
        )}

        {value && (
          <div role="button" className="clear-btn">
            <IoIosClose
              size={28}
              onClick={() => {
                setValidations("");
              }}
            />
          </div>
        )}
        <div className={`dropdown-box ${open && isWebPage ? "open" : ""}`}>
          {filterOptions.length > 0 ? (
            filterOptions?.map((el, i) => {
              return (
                <div
                  key={i}
                  className="option-sec"
                  onClick={() => {
                    setValidations(el.label);
                    setOpen(false);
                  }}
                >
                  {el.value}
                </div>
              );
            })
          ) : (
            <div className="option-sec no-option text-center">no options</div>
          )}
        </div>
      </div>
      {ele?.form?.error_message && (
        <span className="error-message mt-1">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default SelectField;
