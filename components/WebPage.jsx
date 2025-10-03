"use client";
import Aos from "aos";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { commonPostApiFunction } from "../services/commonApiFunc";
import RenderField from "./fieldsComponents/RenderField";
import { addPixel, alignment, textAlign } from "../utils/utilFunctions";
import LayoutComp from "./commonComponents/LayoutComp";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

export const PageContext = createContext();

const WebPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);
  const [currentElement, setCurrentElement] = useState();

  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector((user) => user.auth.authDetails.request_user_id);

  const fetchPage = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        ...(params.id && {
          payload: { page_route: params.id, request_user_id: requestUserId },
        }),
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200 && params.id) {
        setForms(response?.data?.responseData[0]?.page_data);
      } else {
        setForms([]);
      }
    } catch (error) {
      setForms([]);
      setPagesList([]);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true
    });
    fetchPage();
  }, []);

  return (
    <div>
      <PageContext
        value={{
          forms,
          setForms,
          currentElement,
          setCurrentElement,
        }}
      >
        <LayoutComp>
          <div className="d-flex web-div">
            {forms?.length > 0 &&
              forms?.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className={`d-flex ${ele?.type == "card_box" ? 'background-image-props' : ''} ${
                      alignment[ele?.props?.align?.value] || ""
                    } ${ele?.props?.hidden ? "hide" : ""} ${
                      ele?.type == "heading" || ele?.type == "paragraph"
                        ? textAlign[ele?.props?.align?.value] || ""
                        : ""
                    }`}
                    style={{
                      ...(ele?.column_width && {
                        width: `${ele?.column_width}%`,
                      }),
                      ...(ele?.props?.style && addPixel(ele?.props?.style, ele)),
                      ...(ele?.props?.imageData && {
                        backgroundImage: ele?.props?.imageData?.url
                      })
                    }}
                  >
                    <RenderField ele={ele} index={index} />
                  </div>
                );
              })}
          </div>
        </LayoutComp>
      </PageContext>
    </div>
  );
};

export default WebPage;
