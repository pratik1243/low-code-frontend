import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { IoAddSharp } from "react-icons/io5";
import { FormContext } from "../FormCreate";
import Select from "react-select";
import { IoMdArrowBack } from "react-icons/io";
import emptyImg from "../../public/empty-box.png";
import Image from "next/image";
import IconBox from "./IconBox";

function AddMenuContent() {
  const {
    navbarProps,
    setNavbarProps,
    pagesList,
    setShowIconBox,
    menuIndex,
    setMenuIndex,
    showIconBox,
    isSubMenuOpen,
    setIsSubMenuOpen,
  } = useContext(FormContext);

  const [subMenuIndex, setSubMenuIndex] = useState(null);

  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };

  const menuList = isSubMenuOpen
    ? navbarProps?.menus?.menuList[menuIndex]?.subMenus
    : navbarProps?.menus?.menuList;

  const onMenuItemsChange = (value, name, id) => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      const updateSubMenuIems = el?.subMenus?.map((ele, ind) => {
        if (id === ind) {
          return {
            ...ele,
            [name]: value,
          };
        }
        return ele;
      });
      if (menuIndex === i) {
        return { ...el, subMenus: updateSubMenuIems };
      } else if (i === id && !isSubMenuOpen) {
        return {
          ...el,
          [name]: value,
        };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: updateMenuIems },
    });
  };

  const orderContent = (e, dropIndex) => {
    const filterContentList = menuList;
    const dragIndex = JSON.parse(e?.dataTransfer?.getData("menu-item"));
    const draggedItem = filterContentList[dragIndex];
    filterContentList?.splice(dragIndex, 1);
    filterContentList?.splice(dropIndex, 0, draggedItem);
    return filterContentList;
  };

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    const updateSubMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      if (i === menuIndex) {
        return { ...el, subMenus: orderContent(e, dropIndex) };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: {
        ...navbarProps.menus,
        menuList: isSubMenuOpen ? updateSubMenuIems : orderContent(e, dropIndex),
      },
    });
  };

  const onDragStart = (e, i) => {
    e.dataTransfer.setData("menu-item", i);
  };

  const removeMenuItem = (id) => {
    const removedItems = navbarProps.menus?.menuList.filter((e, i) => i !== id);
    const removedSubMenuItems = navbarProps.menus?.menuList.map((el, i) => {
      if (i === menuIndex) {
        return { ...el, subMenus: [...el.subMenus].filter((e, i) => i !== id) };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: {
        ...navbarProps.menus,
        menuList: isSubMenuOpen ? removedSubMenuItems : removedItems,
      },
    });
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const removeMenuIcon = (menuId) => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      const updateSubMenuIems = el?.subMenus?.map((ele, ind) => {
        if (menuId === ind) {
          return {
            ...ele,
            icon: "",
          };
        }
        return ele;
      });
      if (menuIndex === i) {
        return { ...el, subMenus: updateSubMenuIems };
      } else if (i === menuId) {
        return {
          ...el,
          icon: "",
        };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: updateMenuIems },
    });
  };

  const addNavProps = () => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      if (i === menuIndex) {
        return {
          ...el,
          subMenus: [
            ...el.subMenus,
            {
              text: "",
              menuLink: "",
              icon: "",
            },
          ],
        };
      }
      return el;
    });

    if (isSubMenuOpen) {
      setNavbarProps({
        ...navbarProps,
        menus: { ...navbarProps.menus, menuList: updateMenuIems },
      });
    } else {
      setNavbarProps({
        ...navbarProps,
        menus: {
          ...navbarProps.menus,
          menuList: [
            ...navbarProps.menus.menuList,
            {
              text: "",
              menuLink: "",
              icon: "",
              subMenus: [],
            },
          ],
        },
      });
    }
  };

  const setMenuIcon = (iconName) => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      const updateSubMenuIems = el?.subMenus?.map((ele, ind) => {
        if (subMenuIndex === ind) {
          return {
            ...ele,
            icon: iconName,
          };
        }
        return ele;
      });
      if (menuIndex === i && isSubMenuOpen) {
        return { ...el, subMenus: updateSubMenuIems };
      } else if (menuIndex === i) {
        return {
          ...el,
          icon: iconName,
        };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: updateMenuIems },
    });
  };

  const closeIconBox = () => {
    if (!isSubMenuOpen) {
      setMenuIndex(null);
    }
    setShowIconBox(false);
  };

  return (
    <div className="mb-5 mt-5 px-2 menu-customize-sec">
      <div className="d-flex mt-5 align-items-center justify-content-end">
        <Button className="go-back-btn" onClick={addNavProps}>
          <IoAddSharp size={20} />
          &nbsp;{isSubMenuOpen ? "Add Sub Menu" : "Add Menu"}
        </Button>
        {isSubMenuOpen && (
          <Button
            className="go-back-btn"
            onClick={() => {
              setMenuIndex(null);
              setIsSubMenuOpen(false);
            }}
          >
            <IoMdArrowBack size={18} />
            &nbsp;Back To Menu
          </Button>
        )}
      </div>
      <div className="customize-content-table menu-item-table mt-4">
        <Table>
          <thead>
            <tr>
              <th>Menu Label</th>
              <th>Menu Link</th>
              <th>Action</th>
            </tr>
          </thead>
          {menuList?.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center">
                  <div className="py-3">
                    <Image
                      src={emptyImg}
                      height={80}
                      width={80}
                      alt="menu-empty"
                    />
                    <div className="no-menus-txt">No Data Found</div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="customize-option-sec mt-4">
              {menuList?.map((el, i) => {
                const IconComponent = iconType[el?.icon];
                return (
                  <tr
                    key={i}
                    draggable
                    onDragOver={(e) => onDragOver(e)}
                    onDragStart={(e) => onDragStart(e, i)}
                    onDrop={(e) => onDropItem(e, i)}
                  >
                    <td>
                      <div className="option-input d-flex align-items-center m-2">
                        {el?.icon && (
                          <>
                            <IconComponent size={20} />
                            &nbsp;&nbsp;
                          </>
                        )}
                        <input
                          type={"text"}
                          className="customize-input mb-0"
                          placeholder="Enter menu text"
                          value={el?.text || ""}
                          onChange={(e) => {
                            onMenuItemsChange(e.target.value, "text", i);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="option-input m-2">
                        <Select
                          isClearable
                          placeholder={"Select page link"}
                          options={pagesList}
                          value={el?.menuLink || ""}
                          getOptionLabel={(e) => e.page_name}
                          getOptionValue={(e) => e.page_route}
                          onChange={(data) => {
                            onMenuItemsChange(data, "menuLink", i);
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      <Dropdown className="mt-2">
                        <Dropdown.Toggle
                          variant={"light"}
                          className="menu-action-btn"
                        >
                          <HiDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {isSubMenuOpen ? (
                            <Dropdown.Item
                              onClick={() => {
                                setShowIconBox(true);
                                setSubMenuIndex(i);
                              }}
                            >
                              Add Icon
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              onClick={() => {
                                setShowIconBox(true);
                                setMenuIndex(i);
                              }}
                            >
                             {el?.icon ?  "Edit Icon" : "Add Icon"}
                            </Dropdown.Item>
                          )}
                          {!isSubMenuOpen && (
                            <Dropdown.Item
                              onClick={() => {
                                setMenuIndex(i);
                                setIsSubMenuOpen(true);
                              }}
                            >
                              {el?.subMenus?.length > 0
                                ? "Edit Submenu"
                                : "Add Submenu"}
                            </Dropdown.Item>
                          )}
                          {el?.icon && (
                            <Dropdown.Item
                              onClick={() => {
                                removeMenuIcon(i);
                              }}
                            >
                              Remove Icon
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item
                            onClick={() => {
                              removeMenuItem(i);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
      <Modal
        size="lg"
        show={showIconBox}
        className="menu-icon-box"
        onHide={closeIconBox}
      >
        <Modal.Header closeButton>
          <h5>Add Menu Icon</h5>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <IconBox
            hideBackBtn
            setIcon={(iconName) => {
              setMenuIcon(iconName);
            }}
            goBack={closeIconBox}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddMenuContent;
