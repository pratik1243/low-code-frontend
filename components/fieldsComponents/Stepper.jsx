import React, { useEffect, useState } from "react";
import RenderField from "./RenderField";

const Stepper = ({ ele, path }) => {
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

  return (
    <>
      {!path.includes("web-page") ? (
        <div>Stepper Form</div>
      ) : (
        <>
          <div className="stepper-sec">
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
                  style={{
                    ...(el?.column_width && {
                      width: `${el?.column_width}%`,
                    }),
                  }}
                >
                  {" "}
                  <RenderField ele={el} index={i} />{" "}
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </button>
            <button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Stepper;
