"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { API_BASE_URL } from "../../services/endpoints";
import { PageContext } from "../WebPage";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "next/navigation";
import IconComponent from "../commonComponents/IconComponent";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Collapse } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const NavbarComp = () => {
  const params = useParams();
  const { navbarProps, breakPoint } = useContext(PageContext);
  const [menuIndex, setMenuIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobileSize = ["xs", "sm"].includes(breakPoint);

  const scrollContainer = (e, scrollId) => {
    e.stopPropagation();
    const offset = 100;
    const element = document.querySelector(`#${scrollId}`);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  const renderSubMenu = (el) => {
    return (
      <div
        className={`sub-menu-list ${
          !mobileSize && navbarProps?.menus?.menuDropdownAnimation?.value == "Collapse"
            ? "collapse-drop"
            : navbarProps?.menus?.menuDropdownAnimation &&
              navbarProps?.menus?.menuDropdownAnimation?.value !== "Collapse"
            ? "anim-sub-menu-list" : ""
        }`}
        style={{
          ...(navbarProps?.menuTemplate?.value === "Template 2" &&
            !mobileSize && {
              paddingTop: `${parseInt(navbarProps?.logo?.height / 2)}px`,
            }),
        }}
        {...(navbarProps?.menus?.menuDropdownAnimation && !mobileSize &&
          navbarProps?.menus?.menuDropdownAnimation?.value !== "Collapse" && {
            "data-aos": navbarProps?.menus?.menuDropdownAnimation?.value,
            "data-aos-once": "false",
          })}
      >
        <div
          className="inner-sub-menu"
          style={{
            ...(navbarProps?.menus?.menuDropdownColor && {
              backgroundColor: navbarProps?.menus?.menuDropdownColor,
            }),
          }}
        >
          {el?.subMenus.map((ele, id) => {
            return (
              <div
                key={id}
                className="menu-item"
                onClick={(e) => {
                  setDrawerOpen(false);
                  if (ele?.scrollId) {
                    scrollContainer(e, ele?.scrollId);
                  }
                }}
              >
                <Link
                  href={ele?.menuLink?.page_route || `/web-page/${params?.slug?.join("/")}`}
                  style={{
                    ...(navbarProps?.menus?.subMenuColor && {
                      color: navbarProps?.menus?.subMenuColor,
                    }),
                  }}
                >
                  {" "}
                  {ele?.icon && (
                    <>
                      <IconComponent icon={ele?.icon} size={ele?.size} />
                      &nbsp;&nbsp;
                    </>
                  )}
                  {ele?.text}{" "}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const subMenuClick = (e, el, i) => {
    if (el?.subMenus?.length == 0) {
      setDrawerOpen(false);
    }
    if (el?.scrollId && el?.subMenus?.length == 0) {
      scrollContainer(e, el?.scrollId);
    }
    setMenuIndex(mobileSize ? (menuIndex === i ? null : i) : i);
  };

  const hoverMenuIndex = (value) => {
    if (!mobileSize && navbarProps?.menus?.menuDropdownAnimation && navbarProps?.menus?.menuDropdownAnimation?.value !== "Collapse") {
      setMenuIndex(value);
    }
  };

  const renderMenus = () => {
    return (
      <div
        className="d-flex align-items-center"
        style={{
          ...(navbarProps?.menus?.alignment?.value === "Center"
            ? { margin: "auto" }
            : navbarProps?.menus?.alignment?.value === "Left"
            ? { marginRight: "auto" }
            : { marginLeft: "auto" }),
        }}
      >
        {navbarProps?.menus?.menuList?.length > 0 &&
          navbarProps?.menus?.menuList?.map((el, i) => {
            return (
              <div
                key={i}
                className={`menu-item ${!mobileSize && navbarProps?.menuTemplate?.value === "Template 2" ? "template-2" : ""}`}
                onMouseOver={() => {
                  hoverMenuIndex(i);
                }}
                onMouseOut={() => {
                  hoverMenuIndex(null);
                }}
                onClick={(e) => {
                  subMenuClick(e, el, i);
                }}
              >
                {el?.subMenus?.length > 0 ? (
                  <a
                    style={{
                      ...(navbarProps?.menus?.menuColor && {
                        color: navbarProps?.menus?.menuColor,
                      }),
                    }}
                  >
                    {el?.icon && (
                      <>
                        <IconComponent size={el?.size} icon={el?.icon} />
                        &nbsp;&nbsp;
                      </>
                    )}
                    <span>{el?.text}</span>

                    <div className="arrow-icon">
                      <IoIosArrowDown size={18} />
                    </div>
                  </a>
                ) : (
                  <Link
                    href={el?.menuLink?.page_route || `/web-page/${params?.slug?.join("/")}`}
                    style={{
                      ...(navbarProps?.menus?.menuColor && {
                        color: navbarProps?.menus?.menuColor,
                      }),
                    }}
                  >
                    {" "}
                    {el?.icon && (
                      <>
                        <IconComponent size={el?.size} icon={el?.icon} />
                        &nbsp;&nbsp;
                      </>
                    )}
                    {el?.text}
                  </Link>
                )}

                {el?.subMenus?.length > 0 && (
                  <>
                    {mobileSize ? (
                      <Collapse in={menuIndex === i}>
                        {renderSubMenu(el)}
                      </Collapse>
                    ) : (
                      <>
                        {menuIndex === i && renderSubMenu(el)}
                        {!menuIndex && !navbarProps?.menus?.menuDropdownAnimation?.value && renderSubMenu(el)}
                        {!menuIndex && navbarProps?.menus?.menuDropdownAnimation?.value == "Collapse" && renderSubMenu(el)}
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`navbar-section`}
        style={{
          ...(navbarProps?.navBackgroundColor && {
            backgroundColor: navbarProps?.navBackgroundColor,
          }),
        }}
        {...(navbarProps?.navbarAnimation?.value && {
          "data-aos": navbarProps?.navbarAnimation?.value,
          "data-aos-once": "false",
        })}
      >
        {navbarProps?.logo?.logoUrl && (
          <div className="nav-logo">
            <Image
              src={`${API_BASE_URL}/image/${navbarProps?.logo?.logoUrl}`}
              width={navbarProps?.logo?.width || 100}
              height={navbarProps?.logo?.height || 40}
              alt="nav-logo"
            />
          </div>
        )}
        {["lg", "md"].includes(breakPoint) ? (
          renderMenus()
        ) : (
          <div
            role="button"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
          >
            <MdOutlineMenuOpen color={navbarProps?.menus?.hamBurgerButtonColor || "black"} size={31} />
          </div>
        )}
      </div>

      {mobileSize && (
        <div
          className={`mobile-menu-sec ${drawerOpen ? "open" : ""} ${
            navbarProps?.menus?.sideDrawerPosition?.value == "Left"
              ? "left-position" : "right-position"
          }`}
          style={{
            ...(navbarProps?.menus?.sideDrawerColor && {
              backgroundColor: navbarProps?.menus?.sideDrawerColor,
            }),
          }}
        >
          <div className="logo">
            <Image
              src={`${API_BASE_URL}/image/${navbarProps?.logo?.logoUrl}`}
              width={navbarProps?.logo?.width || 100}
              height={navbarProps?.logo?.height || 40}
              alt="nav-logo"
            />

            <div
              role="button"
              onClick={() => {
                setDrawerOpen(!drawerOpen);
              }}
            >
              <IoMdClose size={24} color={navbarProps?.menus?.closeButtonColor || "black"} />
            </div>
          </div>
          {renderMenus()}
        </div>
      )}

      {drawerOpen && (
        <div
          className="back-drop-sec"
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
        ></div>
      )}
    </>
  );
};

export default NavbarComp;
