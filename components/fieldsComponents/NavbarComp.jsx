"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { API_BASE_URL } from "../../services/endpoints";
import { PageContext } from "../WebPage";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "next/navigation";
import IconComponent from "../commonComponents/IconComponent";

const NavbarComp = () => {
  const params = useParams();
  const { navbarProps } = useContext(PageContext);
  const [menuIndex, setMenuIndex] = useState(null);

  const renderSubMenu = (el) => {
    return (
      <div
        className={`sub-menu-list ${
          navbarProps?.menus?.menuDropdownAnimation?.value == "Collapse"
            ? "collapse-drop"
            : navbarProps?.menus?.menuDropdownAnimation &&
              navbarProps?.menus?.menuDropdownAnimation?.value !== "Collapse"
            ? "anim-sub-menu-list"
            : ""
        }`}
        style={{
          ...(navbarProps?.menuTemplate?.value === "Template 2" && {
            paddingTop: `${parseInt(navbarProps?.logo?.height / 2)}px`,
          }),
        }}
        {...(navbarProps?.menus?.menuDropdownAnimation &&
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
              <div key={id} className="menu-item">
                <Link
                  href={
                    ele?.menuLink?.page_route ||
                    `/web-page/${params?.slug?.join("/")}`
                  }
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

  return (
    <div
      className="navbar-section"
      style={{
        ...(navbarProps?.navBackgroundColor && {
          backgroundColor: navbarProps?.navBackgroundColor,
        }),
      }}
    >
      {navbarProps?.logo?.logoUrl && (
        <div style={{ width: `${navbarProps?.logo?.columnWidth}%` }}>
          <Image
            src={`${API_BASE_URL}/image/${navbarProps?.logo?.logoUrl}`}
            width={navbarProps?.logo?.width || 100}
            height={navbarProps?.logo?.height || 40}
            alt="nav-logo"
          />
        </div>
      )}
      <div
        className="d-flex align-items-center"
        style={{ width: `${navbarProps?.menus?.columnWidth}%` }}
      >
        {navbarProps?.menus?.menuList?.length > 0 &&
          navbarProps?.menus?.menuList?.map((el, i) => {
            return (
              <div
                key={i}
                className={`menu-item ${
                  navbarProps?.menuTemplate?.value === "Template 2"
                    ? "template-2"
                    : ""
                }`}
                onMouseOver={() => {
                  if (
                    navbarProps?.menus?.menuDropdownAnimation &&
                    navbarProps?.menus?.menuDropdownAnimation?.value !==
                      "Collapse"
                  ) {
                    setMenuIndex(i);
                  }
                }}
                onMouseOut={() => {
                  if (
                    navbarProps?.menus?.menuDropdownAnimation &&
                    navbarProps?.menus?.menuDropdownAnimation?.value !==
                      "Collapse"
                  ) {
                    setMenuIndex(null);
                  }
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
                    href={
                      el?.menuLink?.page_route ||
                      `/web-page/${params?.slug?.join("/")}`
                    }
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
                    {menuIndex === i && renderSubMenu(el)}
                    {!menuIndex && navbarProps?.menus?.menuDropdownAnimation?.value == "Collapse" && renderSubMenu(el)}
                    {!menuIndex && !navbarProps?.menus?.menuDropdownAnimation?.value && renderSubMenu(el)}
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NavbarComp;
