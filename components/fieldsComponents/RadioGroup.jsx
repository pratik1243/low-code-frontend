import React, { useContext, useState } from "react";
import { updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

function RadioGroup({
  ele,
  path,
  index = null,
  currentStep = null,
  containerBackground = null,
}) {
  const isWebPage = path.includes("web-page");

  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext
  );

  const setValidations = (value) => {
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

  return (
    <>
      {!isWebPage ? (
        <div>Radio Button Group</div>
      ) : (
        <div className="radio-box-section">
          <label
            className="title-txt"
            style={{
              ...(isWebPage && {
                backgroundColor: containerBackground
                  ? containerBackground
                  : ele?.props?.style?.background,
              }),
            }}
          >
            {ele?.props?.title || "Enter Title"}{" "}
            {ele?.props?.required && <span className="required">*</span>}
          </label>
          <div className="radio-btns d-flex align-items-center">
            {ele?.props?.radio_options?.map((el, i) => {
              return (
                <div
                  className={`radio-btn-sec ${
                    el?.value === ele?.props?.value ? "checked" : ""
                  }`}
                  key={i}
                  style={{
                    ...(isWebPage && {
                      color: ele?.props?.style?.color,
                      backgroundColor: containerBackground
                        ? containerBackground
                        : ele?.props?.style?.background,
                    }),
                  }}
                  onClick={() => {
                    setValidations(el?.value);
                  }}
                >
                  <div className="inner-radio-sec">
                    <input
                      type="radio"
                      id={`${el?.value}-${index}`}
                      name={ele?.props?.name || `radio-${index}`}
                      style={{
                        ...(isWebPage && {
                          ...(ele?.props?.checkBoxColor &&
                            el?.value === ele?.props?.value && {
                              borderColor: ele?.props?.checkBoxColor,
                            }),
                        }),
                      }}
                    />
                    <div
                      className="radio-dot"
                      style={{
                        ...(isWebPage && {
                          ...(ele?.props?.checkBoxColor && {
                            backgroundColor: ele?.props?.checkBoxColor,
                          }),
                        }),
                      }}
                    ></div>
                  </div>
                  <label htmlFor={`${el?.value}-${index}`}>{el?.label}</label>
                </div>
              );
            })}
          </div>
          {ele?.form?.error_message && (
            <span className="error-message mt-3">
              Please choose at least one option
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default RadioGroup;
