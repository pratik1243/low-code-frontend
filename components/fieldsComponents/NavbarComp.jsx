"use client";
import Image from "next/image";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import React, { useContext } from "react";
import { API_BASE_URL } from "../../services/endpoints";
import { PageContext } from "../WebPage";
import { IoIosArrowDown } from "react-icons/io";

const NavbarComp = () => {
  const { navbarProps } = useContext(PageContext);
  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
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
            const IconComponent = iconType[el?.icon];
            return (
              <div key={i} className="menu-item">
                {el?.subMenus?.length > 0 ? (
                  <a>
                    <span
                      style={{
                        ...(navbarProps?.menus?.menuColor && {
                          color: navbarProps?.menus?.menuColor,
                        }),
                      }}
                    >
                      {el?.text}
                    </span>

                    <div className="arrow-icon">
                      <IoIosArrowDown size={20.5} />
                    </div>
                  </a>
                ) : (
                  <Link
                    href={el?.menuLink?.page_route}
                    style={{
                      ...(navbarProps?.menus?.menuColor && {
                        color: navbarProps?.menus?.menuColor,
                      }),
                    }}
                  >
                    {" "}
                    {el?.icon && (
                      <>
                        <IconComponent size={17} />
                        &nbsp;&nbsp;
                      </>
                    )}
                    {el?.text}
                  </Link>
                )}

                {el?.subMenus?.length > 0 && (
                  <div className="sub-menu-list">
                    <div className="inner-sub-menu">
                      {el?.subMenus.map((ele, id) => {
                        const IconSubMenuComponent = iconType[ele?.icon];
                        return (
                          <div key={id} className="menu-item">
                            <Link
                              href={ele?.menuLink?.page_route}
                              style={{
                                ...(navbarProps?.menus?.subMenuColor && {
                                  color: navbarProps?.menus?.subMenuColor,
                                }),
                              }}
                            >
                              {" "}
                              {ele?.icon && (
                                <>
                                  <IconSubMenuComponent size={18} />
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NavbarComp;
