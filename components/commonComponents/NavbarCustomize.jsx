import React from "react";
import { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import Select from "react-select";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FormContext } from "../FormCreate";
import { IoAddSharp } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { API_BASE_URL } from "../../services/endpoints";
import Image from "next/image";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";

function NavbarCustomize({ setMenuIndex }) {
  const dispatch = useDispatch();
  const {
    navbarProps,
    setNavbarProps,
    pagesList,
    setShowIconBox,
    setNavSettings,
  } = useContext(FormContext);

  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };

  const token = useSelector((user) => user.auth.authDetails.token);

  const uploadImage = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoader(true));
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const requestData = {
        key: "mfgtrwo",
        payload: formData,
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        setNavbarProps({
          ...navbarProps,
          logo: { ...navbarProps.logo, logoUrl: response?.data?.id },
        });
        dispatch(
          setSnackbarProps({
            variant: "Success",
            message: "Logo Uploaded Successfully!",
            open: true,
          })
        );
      } else {
        dispatch(
          setSnackbarProps({
            variant: "Danger",
            message: response?.data?.message,
            open: false,
          })
        );
      }
    } catch (error) {
      dispatch(
        setSnackbarProps({
          variant: "Danger",
          message: "Something Went Wrong90!",
          open: true,
        })
      );
    }
  };

  const removeNavLogo = () => {
    setNavbarProps({
      ...navbarProps,
      logo: { ...navbarProps.logo, logoUrl: "" },
    });
  };

  const onMenuItemsChange = (value, name, id) => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      if (i === id) {
        return { ...el, [name]: value };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: updateMenuIems },
    });
  };

  const orderContent = (e, dropIndex) => {
    const filterContentList = navbarProps.menus?.menuList;
    const dragIndex = JSON.parse(e?.dataTransfer?.getData("menu-item"));
    const draggedItem = filterContentList[dragIndex];
    filterContentList?.splice(dragIndex, 1);
    filterContentList?.splice(dropIndex, 0, draggedItem);
    return filterContentList;
  };

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: orderContent(e, dropIndex) },
    });
  };

  const onDragStart = (e, i) => {
    e.dataTransfer.setData("menu-item", i);
  };

  const removeMenuItem = (id) => {
    const removedItems = navbarProps.menus?.menuList.filter((e, i) => i !== id);
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: removedItems },
    });
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const removeMenuIcon = (id) => {
    const updateMenuIems = navbarProps.menus?.menuList?.map((el, i) => {
      if (i === id) {
        return { ...el, icon: "" };
      }
      return el;
    });
    setNavbarProps({
      ...navbarProps,
      menus: { ...navbarProps.menus, menuList: updateMenuIems },
    });
  };

  const addNavProps = () => {
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
          },
        ],
      },
    });
  };

  const setColumnWidth = (e) => {
    const { name, value } = e.target;
    setNavbarProps({
      ...navbarProps,
      [name]: {
        ...navbarProps[name],
        columnWidth: value,
      },
    });
  };

  const setLogoSize = (e) => {
    const { name, value } = e.target;
    setNavbarProps({
      ...navbarProps,
      logo: {
        ...navbarProps.logo,
        [name]: value,
      },
    });
  };

  return (
    <div>
      {" "}
      <Container className="mt-4">
        <div className="mb-4 px-2">
          <Button
            variant={"primary"}
            className="go-back-btn"
            onClick={() => {
              setNavSettings(false);
            }}
          >
            <IoMdArrowBack size={18} /> &nbsp;&nbsp;Back
          </Button>
        </div>
        <div className="mb-5 px-2">
          <label className="mb-2">Upload Logo</label>
          {navbarProps?.logo?.logoUrl ? (
            <div className="nav-logo-upload-sec">
              <Image
                src={`${API_BASE_URL}/image/${navbarProps?.logo?.logoUrl}`}
                height={40}
                width={100}
                alt={`image-nav`}
                quality={90}
              />
              <div
                role={"button"}
                className="remove-btn"
                onClick={removeNavLogo}
              >
                <IoMdClose />
              </div>
            </div>
          ) : (
            <div className="upload-image-btn mb-2">
              <div className="text-center">
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => uploadImage(e)}
                />
                <div className="mb-2">
                  <FiUpload size={21} />
                </div>
                Click or <span className="click-text">Drag & Drop Image</span>{" "}
                to upload (jpg, png and jpeg)
              </div>
              <label htmlFor="upload-image"></label>
            </div>
          )}
        </div>
        <Container className="mb-4">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <label className="mb-2">
                Logo Column Width ({navbarProps?.logo?.columnWidth || ""}%)
              </label>
              <input
                type="range"
                value={navbarProps?.logo?.columnWidth || ""}
                min={0}
                max={100}
                name="logo"
                className="w-100"
                onChange={(e) => {
                  setColumnWidth(e);
                }}
              />
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <label className="mb-2">
                Menus Column Width ({navbarProps?.menus?.columnWidth || ""}%)
              </label>
              <input
                type="range"
                value={navbarProps?.menus?.columnWidth || ""}
                min={0}
                max={100}
                name="menus"
                className="w-100"
                onChange={(e) => {
                  setColumnWidth(e);
                }}
              />
            </Col>
          </Row>
        </Container>

        <Container className="mb-4">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Logo Height</label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  name="height"
                  value={navbarProps?.logo?.height || ""}
                  className="customize-input"
                  onChange={(e) => {
                    setLogoSize(e);
                  }}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Logo Width</label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  name="width"
                  value={navbarProps?.logo?.width || ""}
                  className="customize-input"
                  onChange={(e) => {
                    setLogoSize(e);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col lg={6} md={6}>
              <Row>
                <Col lg={9} md={9}>
                  <label className="mb-2">Navbar Background Color</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.navBackgroundColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        navBackgroundColor: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col lg={3} md={3}>
                  <Button
                    variant={"primary"}
                    size="sm"
                    className="clear-background-btn"
                    onClick={() => {
                      setNavbarProps({
                        ...navbarProps,
                        navBackgroundColor: "",
                      });
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6}>
              <Row>
                <Col lg={9} md={9}>
                  <label className="mb-2">Menu Color</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.menuColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          menuColor: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col lg={3} md={3}>
                  <Button
                    variant={"primary"}
                    size="sm"
                    className="clear-background-btn"
                    onClick={() => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          menuColor: "",
                        },
                      });
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <div className="mb-5 mt-5 px-2">
          <Button className="add-icon-btn" onClick={addNavProps}>
            <IoAddSharp size={20} /> Add Menu
          </Button>
          <div className="customize-content-table menu-item-table mt-4">
            <Table bordered>
              <thead>
                <tr>
                  <th>Menu Label</th>
                  <th>Menu Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="customize-option-sec mt-4">
                {navbarProps?.menus?.menuList?.map((el, i) => {
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
                          {el?.icon && <IconComponent size={20} />}&nbsp;&nbsp;
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
                            <Dropdown.Item
                              onClick={() => {
                                setShowIconBox(true);
                                setMenuIndex(i);
                              }}
                            >
                              Add Icon
                            </Dropdown.Item>
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
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NavbarCustomize;
