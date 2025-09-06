import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  addPixel,
  alignment,
  containerClasses,
  errorMessageFunc,
  textAlign,
} from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import RenderField from "./RenderField";

const Stepper = ({ ele, path }) => {
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );
  const [stepsArr, setStepsArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (stepsArr.length - 1 > currentStep) {
      setStepsArr(stepsArr.filter((el) => el !== currentStep + 1));
      setPrevArr(prevArr.filter((el) => el !== currentStep));
    } else {
      setStepsArr([...stepsArr, currentStep]);
      if (currentStep) {
        setPrevArr([...prevArr, currentStep - 1]);
      }
    }
  }, [currentStep]);

  const checkErrorMessages = (data) => {    
    const isValid = data.every((el) => el?.content ? checkErrorMessages(el?.content) : (el?.props?.value !== "" && el?.form?.error_message == "") );
    return isValid;
  };

  const nextStep = () => {    
    const validateForms = forms.map((el, i) => {
      const stepContentForm = el?.props?.stepContent?.map((data, id) => {
        const updatedForms = data?.content?.map((datas, ind) => {
          const nestedForm = datas?.content?.map((eles, i) => {
            return {
              ...eles,
              form: {
                ...eles?.form,
                error_message: errorMessageFunc(eles, eles?.props?.value),
              },
            };
          });

          if (datas?.content) {
            return { ...datas, content: nestedForm };
          } else {
            return {
              ...datas,
              form: {
                ...datas?.form,
                error_message: errorMessageFunc(datas, datas?.props?.value),
              },
            };
          }
        });
        if (id === currentStep) {
          return { ...data, content: updatedForms };
        }
        return data;
      });

      if (el?.type === "stepper") {
        return { ...el, props: { ...el.props, stepContent: stepContentForm } };
      }
      return el;
    });
    setForms(validateForms);

    if (checkErrorMessages(ele?.props?.stepContent[currentStep]?.content)) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      {!path.includes("web-page") ? (
        <div>Stepper Form</div>
      ) : (
        <div
          className={`${
            containerClasses[ele?.props?.containerType?.value] || ""
          }`}
        >
          <div className={"stepper-sec mb-4"}>
            <div className="indicator-line"></div>
            <div className="progress-stepper-sec">
              {ele?.props?.stepContent?.map((el, index) => {
                return (
                  <div key={index} className="progress-inner-step">
                    <div
                      className={`active-indicator-line ${
                        currentStep === index ? "current-line" : ""
                      } ${prevArr.includes(index) ? "previous-line" : ""}`}
                      style={{ transitionDelay: `all ${0.5 * index + 1}s` }}
                    ></div>
                    <div
                      className={`pointer-sec ${
                        currentStep == index
                          ? "step-active"
                          : stepsArr.includes(index)
                          ? "step-completed"
                          : ""
                      }`}
                    >
                      <span>{index + 1}</span>
                    </div>
                    <span
                      className={`step-txt ${
                        currentStep == index
                          ? "step-txt-active"
                          : stepsArr.includes(index)
                          ? "step-txt-completed"
                          : ""
                      }`}
                    >
                      {el?.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="stepper-content">
            {ele?.props?.stepContent[currentStep]?.content.map((el, i) => {
              return (
                <div
                  key={i}
                  className={`position-relative element-column column_${
                    el?.id
                  } ${alignment[el?.props?.align?.value] || ""} ${
                    el?.props?.hidden
                      ? "hide"
                      : el?.props?.hidden
                      ? "hidden"
                      : ""
                  } ${textAlign[el?.props?.align?.value] || ""} d-flex`}
                  style={{
                    ...(el?.column_width && { width: `${el?.column_width}%` }),
                    ...(el?.props?.style && addPixel(el?.props?.style, el)),
                  }}
                >
                  {" "}
                  <RenderField
                    ele={el}
                    index={i}
                    currentStep={currentStep}
                  />{" "}
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-between mt-4">
            {currentStep !== 0 ? (
              <Button
                variant="primary"
                className="prev-btn"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              variant="primary"
              className="next-btn"
              disabled={ele?.props?.stepContent?.length - 1 === currentStep}
              onClick={nextStep}
            >
              {ele?.props?.stepContent?.length - 1 === currentStep
                ? "Submit"
                : "Save & Continue"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Stepper;
