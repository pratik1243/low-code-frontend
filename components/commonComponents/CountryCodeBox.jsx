import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { IoMdArrowDropdown } from "react-icons/io";
import { API_BASE_URL } from "../../services/endpoints";
import { countryCallingCodes } from "../../utils/utilFunctions";

function CountryCodeBox({ countryCodeOpen, setCountryCodeOpen }) {
  const boxRef = useRef(null);
  const [countryValue, setCountryValue] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [countryCode, setCountryCode] = useState({
    value: "IN",
    label: "India",
  });

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

  function handleClickOutside(event) {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setCountryCodeOpen(false);
      setCountryValue("");
    }
  }

  const setCodes = (code) => {
    setCountryValue("");
    setCountryCode(code);
    setCountryCodeOpen(false);
  };

  const filterOptions = countriesList.filter((el) =>
    el.label.toLowerCase().includes(countryValue.toLowerCase())
  );

  useEffect(() => {
    getCountries();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={boxRef}>
      <div
        role={"button"}
        onClick={() => {
          setCountryCodeOpen(!countryCodeOpen);
        }}
        className={`selected-country-code ${
          countryCallingCodes[countryCode?.value]?.toString()?.length == 3
            ? "three-len-code"
            : countryCallingCodes[countryCode?.value]?.toString()?.length == 1
            ? "one-len-code"
            : ""
        }`}
      >
        <ReactCountryFlag
          svg
          countryCode={countryCode?.value || "IN"}
          style={{ width: "1.4em", height: "1.1em" }}
        />
        <span className="country-number-txt">{`+${
          countryCallingCodes[countryCode?.value]
        }`}</span>
        <IoMdArrowDropdown />
      </div>

      {countryCodeOpen && (
        <div className="country-code-sec">
          <div className="input-search">
            <textarea
              rows={1}
              placeholder="Search here..."
              onChange={(e) => {
                setCountryValue(e.target.value);
              }}
            />
          </div>
          <div className="country-code-list">
            {filterOptions.length > 0 ? (
              filterOptions?.map((code, i) => {
                return (
                  <div
                    key={i}
                    className="country-code-option"
                    onClick={() => {
                      setCodes(code);
                    }}
                  >
                    <ReactCountryFlag
                      svg
                      countryCode={code?.value}
                      style={{ width: "1.4em", height: "1.1em" }}
                    />
                    <span>{code?.label}</span>
                  </div>
                );
              })
            ) : (
              <div className="no-option text-center">no options</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryCodeBox;
