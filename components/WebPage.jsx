"use client";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { commonPostApiFunction } from "../services/commonApiFunc";
import RenderField from "./fieldsComponents/RenderField";
import Loader from "./commonComponents/Loader";
import { addPixel, alignment, textAlign } from "../utils/utilFunctions";
import Aos from "aos";

export const PageContext = createContext();

const WebPage = () => {
  const params = useParams();
  const [forms, setForms] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentElement, setCurrentElement] = useState();

  const fetchPage = async () => {
    try {
      setLoader(true);
      const requestData = {
        key: "hfgftrj",
        payload: { page_route: params.id },
      };
      const response = await commonPostApiFunction(requestData);
      setLoader(false);
      if (response.status == 200) {
        setForms(response?.data?.responseData[0]?.page_data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  // const alignment = {
  //   Center: "justify-content-center",
  //   Right: "justify-content-end",
  //   left: "justify-content-start",
  // };

  // const textAlign = {
  //   Center: "text-center",
  //   Right: "text-right",
  //   Left: "text-left",
  // };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      // once: true,
    });

    fetchPage();
  }, []);

  return (
    <div className="d-flex web-div">
      <Loader loader={loader} />
      <PageContext
        value={{
          forms,
          setForms,
          currentElement,
          setCurrentElement,
        }}
      >
        {forms?.length > 0 &&
          forms?.map((ele, index) => {
            return (
              <div
                key={index}
                className={`d-flex ${alignment[ele?.props?.align?.value] || ""} ${ele?.props?.hidden ? "hide" : ""} ${ele?.type == "heading" || ele?.type == "paragraph" ? (textAlign[ele?.props?.align?.value] || "") : ""}`}
                style={{
                  ...(ele?.column_width && { width: `${ele?.column_width}%` }),
                  ...(ele?.props?.style && addPixel(ele?.props?.style)),
                }}
              >
                <RenderField ele={ele} index={index} />
              </div>
            );
          })}
      </PageContext>
    </div>
  );
};

export default WebPage;
