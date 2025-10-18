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
  const [forms, setForms] = useState({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });
  const [currentElement, setCurrentElement] = useState();
  const [breakPoint, setBreakPoint] = useState("lg");
  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector(
    (user) => user.auth.authDetails.request_user_id
  );

  const fetchPage = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        ...(params.id && {
          payload: {
            page_route: params.id,
            request_user_id: requestUserId,
            break_point: breakPoint,
          },
        }),
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200 && params.id) {
        setForms({
          ...forms,
          [breakPoint]: response?.data?.responseData?.page_data,
        });
      } else {
        setForms({ ...forms, [breakPoint]: [] });
      }
    } catch (error) {
      setForms({ ...forms, [breakPoint]: [] });
      setPagesList([]);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setBreakPoint("md");
      } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
        setBreakPoint("sm");
      } else if (window.innerWidth < 576) {
        setBreakPoint("xs");
      } else {
        setBreakPoint("lg");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPage();
  }, [breakPoint]);

  return (
    <div>
      <PageContext
        value={{
          forms,
          setForms,
          breakPoint,
          currentElement,
          setCurrentElement,
        }}
      >
        <LayoutComp>
          <div className="d-flex web-div">
            {forms[breakPoint]?.length > 0 &&
              forms[breakPoint]?.map((ele, index) => {
                if (ele?.props?.hidden) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className={`d-flex ${
                      ele?.type == "card_box" ? "background-image-props" : ""
                    } ${alignment[ele?.props?.align?.value] || ""} ${
                      ["input", "select", "country"].includes(ele?.type)
                        ? "input-style"
                        : ""
                    } ${
                      ele?.type == "heading" || ele?.type == "paragraph"
                        ? textAlign[ele?.props?.align?.value] || ""
                        : ""
                    } ${
                      !["select", "country"].includes(ele?.type)
                        ? "overflow-hide"
                        : ""
                    }`}
                    style={{
                      ...(ele?.column_width && {
                        width: `${ele?.column_width}%`,
                      }),
                      ...(ele?.props?.style &&
                        addPixel(ele?.props?.style, ele)),
                      ...(ele?.props?.imageData && {
                        backgroundImage: ele?.props?.imageData?.url,
                      }),
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
