"use client";
import Aos from "aos";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { useParams, usePathname } from "next/navigation";
import { commonPostApiFunction } from "../services/commonApiFunc";
import RenderField from "./fieldsComponents/RenderField";
import LayoutComp from "./commonComponents/LayoutComp";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import NavbarComp from "./fieldsComponents/NavbarComp";
import GraidentLayer from "./commonComponents/GraidentLayer";
import { addPixel } from "../utils/customizePropFunctions";
import { alignment, textAlign } from "../utils/customizeOptions";

export const PageContext = createContext();

const WebPage = () => {
  const params = useParams();
  const path = usePathname();
  const dispatch = useDispatch();
  const token = useSelector((user) => user.auth.authDetails.token);
  const [forms, setForms] = useState({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });
  const [navbarProps, setNavbarProps] = useState({});
  const [currentElement, setCurrentElement] = useState();
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [breakPoint, setBreakPoint] = useState("lg");
  const [pageBackground, setPageBackground] = useState("");

  const fetchPage = useCallback(async (size = "lg") => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        ...(params?.slug?.join("/") && {
          payload: {
            page_route: params.slug.join("/"),
            break_point: size,
          },
        }),
      };
      const response = await commonPostApiFunction(requestData, token);
      if (response.status === 200) {
        const data = response?.data?.responseData;
        setSelectedFont(data?.font_family || "Roboto");
        setPageBackground(data?.page_background);
        setNavbarProps({
          hidden: data?.navbar_props?.hidden,
          logo: data?.navbar_props?.logo,
          menus: data?.navbar_props?.menus,
          navbarAnimation: data?.navbar_props?.navbarAnimation,
          menuTemplate: data?.navbar_props?.menuTemplate,
          navBackgroundColor: data?.navbar_props?.navBackgroundColor,
        });
        setForms((prev) => ({
          ...prev,
          [size]: data?.screenSize || [],
        }));
        Aos.init({
          duration: 1000,
          once: data?.scroll_animation_type?.value === "Once",
        });
      } else {
        setSelectedFont("Roboto");
        setForms((prev) => ({ ...prev, [size]: [] }));
      }
    } catch (error) {
      setSelectedFont("Roboto");
      setForms((prev) => ({ ...prev, [size]: [] }));
    } finally {
      dispatch(setLoader(false));
    }
  }, [dispatch, params, token]);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    let newBreakPoint = "lg";
    if (width < 576) newBreakPoint = "xs";
    else if (width < 768) newBreakPoint = "sm";
    else if (width < 992) newBreakPoint = "md";
    setBreakPoint((prev) => (prev !== newBreakPoint ? newBreakPoint : prev));
  }, []);

  useEffect(() => {
    handleResize();
    let timeout;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 150);
    };
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [handleResize]);

  useEffect(() => {
    if (breakPoint) fetchPage(breakPoint);
  }, [breakPoint, path, fetchPage]);

  useEffect(() => {
    const body = document.getElementById("body-section");
    if (pageBackground && body) {
      body.style.backgroundColor = pageBackground;
    }
    if (selectedFont) {
      const id = "dynamic-font";
      let link = document.getElementById(id);
      if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, "+")}:wght@400&display=swap`;
    }
  }, [pageBackground, selectedFont]);

  const getClassNames = (ele) => {
    return `
      position-relative
      ${!ele?.props?.fullWidth ? "d-flex" : ""}
      ${
        ele?.type === "card_box" || ele?.props?.imageData
          ? "background-image-props"
          : ""
      }
      ${alignment[ele?.props?.align?.value] || ""}
      ${
        ["input", "select", "country"].includes(ele?.type)
          ? "input-style"
          : ""
      }
      ${
        ["heading", "paragraph", "icon"].includes(ele?.type)
          ? textAlign[ele?.props?.align?.value] || ""
          : ""
      }
      ${!["select", "country"].includes(ele?.type) ? "overflow-hide" : ""}
      ${ele?.type === "slider" ? "no-color" : ""}
    `;
  };

  return (
    <PageContext.Provider
      value={{
        forms,
        setForms,
        breakPoint,
        navbarProps,
        setNavbarProps,
        currentElement,
        setCurrentElement,
      }}
    >
      <LayoutComp>
        {!navbarProps?.hidden &&
          (navbarProps?.logo?.logoUrl ||
            navbarProps?.menus?.menuList?.length > 0) && <NavbarComp />}

        <div className="d-flex web-div" style={{ fontFamily: selectedFont }}>
          {forms[breakPoint]?.map((ele, index) => {
            if (ele?.props?.hidden) return null;

            return (
              <div
                key={index}
                className={getClassNames(ele)}
                style={{
                  ...(ele?.column_width && {
                    width: `${ele.column_width}%`,
                  }),
                  ...(ele?.props?.style &&
                    addPixel(ele?.props?.style, ele)),
                  ...(ele?.props?.imageData && {
                    backgroundImage: ele?.props?.imageData?.url,
                  }),
                }}
              >
                <RenderField ele={ele} index={index} />
                {ele?.props?.gradientColor && (
                  <GraidentLayer data={ele} />
                )}
              </div>
            );
          })}
        </div>
      </LayoutComp>
    </PageContext.Provider>
  );
};

export default WebPage;