import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { PageContext } from "../WebPage";
import { FormContext } from "../FormCreate";
import { addPixel, updateNestedForms } from "../../utils/utilFunctions";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";

const CountryField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
  const boxRef = useRef(null);
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );
  const token = useSelector((user) => user.auth.authDetails.token);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/countries-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setCountriesList(response?.data?.responseData);
      } else {
        setCountriesList([]);
      }
    } catch (error) {
      setCountriesList([]);
    }
  };

  const setValidations = (value) => {
    setValue(value);
    setForms(updateNestedForms(forms, ele, value, currentStep));
  };

  const filterOptions = countriesList.filter((el) =>
    el.label.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    getCountries();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-3 position-relative" ref={boxRef}>
      <div
        className={`element-input-field ${
          (ele?.props?.floatLabel || ele?.props?.standard) &&
          path.includes("web-page")
            ? "float-label"
            : ""
        } ${
          ele?.props?.standard && path.includes("web-page")
            ? "standard-input"
            : ""
        }`}
      >
        <label
          style={{
            ...(ele?.props?.style?.color &&
              path.includes("web-page") && { color: ele?.props?.style?.color }),
            ...(containerBackground && {
              backgroundColor: containerBackground,
            }),
          }}
        >
          {"Country"}{" "}
          {ele?.props?.required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          value={ele?.props?.value || ""}
          className={ele?.name}
          placeholder={ele?.props?.placeholder || "Enter placeholder"}
          onChange={(e) => {
            setValidations(e.target.value);
          }}
          required
          style={{
            ...(ele?.props?.style &&
              path.includes("web-page") &&
              addPixel(ele?.props?.style, ele)),
            color: "#aaa9a9",
            ...((ele?.props?.standard || ele?.props?.floatLabel) &&
              path.includes("web-page") && {
                backgroundColor: "transparent",
              }),
          }}
          onClick={() => {
            setOpen(true);
          }}
        />

        {value && (
          <div role="button" className="clear-btn">
            <IoIosClose
              size={23}
              onClick={() => {
                setValidations("");
              }}
            />
          </div>
        )}
        <div
          className={`dropdown-box ${
            open && path.includes("web-page") ? "open" : ""
          }`}
        >
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
                  {el.label}
                </div>
              );
            })
          ) : (
            <div className="option-sec text-center">no options</div>
          )}
        </div>
      </div>
      {ele?.props?.standard && path.includes("web-page") && (
        <div
          className="standard-line"
          style={{
            ...(ele?.props?.style?.color &&
              path.includes("web-page") && {
                backgroundColor: ele?.props?.style?.color,
              }),
          }}
        ></div>
      )}
      {ele?.form?.error_message && (
        <span className="error-message mt-1">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default CountryField;
