import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { PageContext } from "../WebPage";
import { FormContext } from "../FormCreate";
import { updateNestedForms } from "../../utils/utilFunctions";

const CountryField = ({ ele, path }) => {
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );
  const [countriesList, setCountriesList] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/countries-list");
      if (response.status == 200) {
        setCountriesList(response?.data?.responseData);
      } else {
        setCountriesList([]);
      }
    } catch (error) {
      setCountriesList([]);
    }
  };

  const setValidations = (data) => {
    const value = typeof data == "object" ? data : data?.value || "";
    setForms(updateNestedForms(forms, ele, value, currentStep));
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className={`element-input-field ${ele?.props?.floatLabel && path.includes("web-page") ? 'float-label' : ''} mb-3`}>
      <label>
        Country {ele?.props?.required && <span className="required">*</span>}
      </label>
      <Select
        isClearable
        defaultValue={ele?.props?.value}
        name={ele?.name}
        className={ele?.name}
        placeholder={ele?.props?.placeholder || "Enter placeholder"}
        options={countriesList}
        onChange={(e) => {
          setValidations(e);
        }}
      />
      {ele?.form?.error_message && (
        <span className="error-message">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default CountryField;
