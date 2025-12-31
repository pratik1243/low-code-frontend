import React, { useContext, useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addPixel, updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import { API_BASE_URL } from "../../services/endpoints";
import { IoMdArrowDropdown } from "react-icons/io";

const TextField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
  const boxRef = useRef(null);
  const isWebPage = path.includes("web-page");
  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext
  );
  const [showPassword, setShowPassword] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState();
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);

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

  const filterOptions = countriesList.filter((el) =>
    el.label.toLowerCase().includes(value.toLowerCase())
  );

  const setValidations = (e) => {
    setForms({
      ...forms,
      [breakPoint]: updateNestedForms(
        forms,
        ele,
        e.target.value,
        currentStep,
        breakPoint
      ),
    });
  };

  function handleClickOutside(event) {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setCountryCodeOpen(false);
      setValue("");
    }
  }

  useEffect(() => {
    if (ele?.props?.countryCode) {
      getCountries();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-3 position-relative" ref={boxRef}>
      <div
        className={`element-input-field ${
          (ele?.props?.floatLabel || ele?.props?.standard) && isWebPage
            ? "float-label"
            : ""
        } ${ele?.props?.standard && isWebPage ? "standard-input" : ""}`}
      >
        {" "}
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
        {isWebPage && ele?.props?.countryCode && countryCodeOpen && (
          <div className="country-code-sec">
            <div className="input-search">
              <textarea
                rows={1}
                placeholder="Search here..."
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
            <div className="country-code-list">
              {filterOptions?.map((code, i) => {
                  return (
                    <div
                      key={i}
                      className="country-code-option"
                      onClick={() => {
                        setValue("");
                        setCountryCode(code);
                        setCountryCodeOpen(false);
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={code?.value}
                        svg
                        style={{ width: "1.4em", height: "1.1em" }}
                      />
                      <span>{code?.label}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {isWebPage && ele?.props?.countryCode && (
          <div
            role={"button"}
            onClick={() => {
              setCountryCodeOpen(!countryCodeOpen);
            }}
            className="selected-country-code"
          >
            <ReactCountryFlag
              countryCode={countryCode?.value || "IN"}
              svg
              style={{ width: "1.4em", height: "1.1em" }}
            />
            <IoMdArrowDropdown />
          </div>
        )}
        <input
          type={
            ele?.props?.isPassword
              ? showPassword
                ? "text"
                : "password"
              : "text"
          }
          id={ele?.id}
          value={ele?.props?.value}
          className={`${ele?.name} ${
            ele?.props?.standard ? "no-standard-border" : ""
          } ${ele?.props?.style?.borderColor ? 'is-border-color' : ''}`}
          placeholder={ele?.props?.placeholder || "Enter placeholder"}
          onChange={(e) => setValidations(e)}
          {...(ele?.props?.maxLength > "0" && {
            maxLength: ele?.props?.maxLength,
          })}
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
        {isWebPage && ele?.props?.isPassword && (
          <div
            role="button"
            className="password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      {ele?.form?.error_message && (
        <span className="error-message mt-1">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default TextField;
