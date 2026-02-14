import React from "react";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FormContext } from "../FormCreate";
import { API_BASE_URL } from "../../services/endpoints";
import Image from "next/image";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import AddMenuContent from "./AddMenuContent";
import Select from "react-select";
import {
  menuTemplateList,
  menuAnimationOptions,
  snackProps,
  menuAlignmenOptions,
} from "../../utils/utilFunctions";
import { toast } from "react-toastify";

function NavbarCustomize() {
  const dispatch = useDispatch();
  const { navbarProps, setNavbarProps, setNavSettings } =
    useContext(FormContext);
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
        toast.success(response?.data?.message, snackProps);
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const removeNavLogo = () => {
    setNavbarProps({
      ...navbarProps,
      logo: { ...navbarProps.logo, logoUrl: "" },
    });
  };

  // const setColumnWidth = (e) => {
  //   const { name, value } = e.target;
  //   setNavbarProps({
  //     ...navbarProps,
  //     [name]: {
  //       ...navbarProps[name],
  //       columnWidth: value,
  //     },
  //   });
  // };

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
        <div className="mb-4 px-2">
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
          <hr className="mt-5" />
        </div>
        <Container className="mb-2">
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="customize-checkbox mb-4">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="checkbox-hidden"
                    checked={navbarProps?.hidden || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        hidden: e.target.checked,
                      });
                    }}
                  />
                  <label htmlFor="checkbox-hidden">Hide Navbar</label>
                </div>
              </div>
            </Col>
            {/* <Col lg={6} md={6} sm={12} xs={12}>
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
            </Col> */}            
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
                  max={50}
                  name="height"
                  placeholder="Enter height"
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
                  max={100}
                  name="width"
                  placeholder="Enter width"
                  value={navbarProps?.logo?.width || ""}
                  className="customize-input"
                  onChange={(e) => {
                    setLogoSize(e);
                  }}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec mt-4">
                <label className="mb-2">Menu Template</label>
                <Select
                  isClearable
                  placeholder={"Select template"}
                  options={menuTemplateList}
                  value={navbarProps?.menuTemplate || ""}
                  onChange={(e) => {
                    setNavbarProps({
                      ...navbarProps,
                      menuTemplate: e,
                    });
                  }}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec mt-4">
                <label className="mb-2">Menu Dropdown Animation</label>
                <Select
                  isClearable
                  placeholder={"Select animation"}
                  options={menuAnimationOptions}
                  value={navbarProps?.menus?.menuDropdownAnimation || ""}
                  onChange={(e) => {
                    setNavbarProps({
                      ...navbarProps,
                      menus: {
                        ...navbarProps.menus,
                        menuDropdownAnimation: e,
                      },
                    });
                  }}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec mt-4">
                <label className="mb-2">Menus Alignment</label>
                <Select
                  isClearable
                  placeholder={"Select alignment"}
                  options={menuAlignmenOptions}
                  value={navbarProps?.menus?.alignment || ""}
                  onChange={(e) => {
                    setNavbarProps({
                      ...navbarProps,
                      menus: {
                        ...navbarProps.menus,
                        alignment: e,
                      },
                    });
                  }}
                />
              </div>
            </Col>
          </Row>
          <hr className="mt-5" />
        </Container>

        <Container className="mt-5">
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
                  <label className="mb-2">Menu Text Color</label>
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
            <Col lg={6} md={6}>
              <Row className="mt-4">
                <Col lg={9} md={9}>
                  <label className="mb-2">SubMenu Text Color</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.subMenuColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          subMenuColor: e.target.value,
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
                          subMenuColor: "",
                        },
                      });
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6}>
              <Row className="mt-4">
                <Col lg={9} md={9}>
                  <label className="mb-2">Menu Dropdown Color</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.menuDropdownColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          menuDropdownColor: e.target.value,
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
                          menuDropdownColor: "",
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
          <hr className="mt-5" />
        </Container>
        <AddMenuContent />
      </Container>
    </div>
  );
}

export default NavbarCustomize;
