"use client";
import Aos from "aos";
import React, { createContext, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { commonPostApiFunction } from "../services/commonApiFunc";
import RenderField from "./fieldsComponents/RenderField";
import { addPixel, alignment, textAlign } from "../utils/utilFunctions";
import LayoutComp from "./commonComponents/LayoutComp";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

export const PageContext = createContext();

const WebPage = () => {
  const params = useParams();
  const path = usePathname();
  const dispatch = useDispatch();
  const [forms, setForms] = useState({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });
  const [currentElement, setCurrentElement] = useState();  
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [breakPoint, setBreakPoint] = useState("lg");
  const token = useSelector((user) => user.auth.authDetails.token);
  //const requestUserId = useSelector((user) => user.auth.authDetails.request_user_id);

  const fetchPage = async (size = "lg") => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        ...(params?.slug?.join('/') && {
          payload: {
            page_route: params?.slug?.join('/'),
            // request_user_id: requestUserId,
            break_point: size,
          },
        }),
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        setSelectedFont(response?.data?.responseData?.font_family);
        setForms({
          ...forms,
          [size]: response?.data?.responseData?.page_data,
        });
      } else {
        //setSelectedFont("Roboto");
        setForms({ ...forms, [size]: [] });
      }
    } catch (error) {
      //setSelectedFont("Roboto");
      setForms({ ...forms, [size]: [] });
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      // once: true,
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
    fetchPage(breakPoint);
  }, [breakPoint, path?.toString()]);

  
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont?.replace(/ /g, "+")}:wght@400&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [selectedFont]);


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
          <div className="d-flex web-div" style={{ fontFamily: selectedFont }}>
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
                      ele?.type == "heading" || ele?.type == "paragraph" || ele?.type == "icon"
                        ? textAlign[ele?.props?.align?.value] || ""
                        : ""
                    } ${
                      !["select", "country"].includes(ele?.type)
                        ? "overflow-hide"
                        : ""
                    } ${ele?.type === "slider" ? "no-color" : ""}`}
                    style={{
                      ...(ele?.column_width && {
                        width: `${ele?.column_width}%`,
                      }),
                      ...(ele?.props?.style && addPixel(ele?.props?.style, ele)),
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
