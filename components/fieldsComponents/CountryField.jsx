import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { PageContext } from "../WebPage";
import { FormContext } from "../FormCreate";
import { addPixel, updateNestedForms } from "../../utils/utilFunctions";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { API_BASE_URL } from "../../services/endpoints";

const CountryField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
  const isWebPage = path.includes("web-page");
  const boxRef = useRef(null);
  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext
  );
  //const token = useSelector((user) => user.auth.authDetails.token);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [countriesList, setCountriesList] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/countries-list`, {
        headers: {
          "Content-Type": "application/json",
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
    setForms({
      ...forms,
      [breakPoint]: updateNestedForms(
        forms,
        ele,
        value,
        currentStep,
        breakPoint
      ),
    });
  };

  const filterOptions = countriesList.filter((el) =>
    el.label.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    getCountries();
  }, []);

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
        className={`element-input-field select-inp ${
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
          {"Country"}{" "}
          {ele?.props?.required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          id={ele?.id}
          value={ele?.props?.value || ""}
          className={`${ele?.name} ${
            ele?.props?.standard ? "no-standard-border" : ""
          }`}
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
                backgroundColor: ele?.props?.style?.borderColor,
                ...(ele?.props?.style?.borderColor && {
                  height: "2px !important",
                }),
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
                  {el.label}
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

export default CountryField;
