import React from "react";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import { IoMdArrowBack } from "react-icons/io";
import AddMenuContent from "./AddMenuContent";
import Select from "react-select";
import {
  menuTemplateList,
  menuAlignmenOptions,
  menuAnimationOptions,
  navAnimationOptions,
  drawerAlignmenOptions,
} from "../../utils/customizeOptions";
import UploadImageComp from "./UploadImageComp";

function NavbarCustomize() {
  const { navbarProps, setNavbarProps, setNavSettings } = useContext(FormContext);

  const removeNavLogo = () => {
    setNavbarProps({
      ...navbarProps,
      logo: { ...navbarProps.logo, logoUrl: "" },
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
        <div className="mb-4 px-2">
          <UploadImageComp
            preview={true}
            label="Upload Logo"
            uploadedState={navbarProps?.logo?.logoUrl}
            removeUploadedFile={removeNavLogo}
            onFileUpload={(e, imageData) => {
              setNavbarProps({
                ...navbarProps,
                logo: { ...navbarProps.logo, logoUrl: imageData?.url },
              });
            }}
          />

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
                <label className="mb-2">Navbar Animation</label>
                <Select
                  isClearable
                  placeholder={"Select animation"}
                  options={navAnimationOptions}
                  value={navbarProps?.navbarAnimation || ""}
                  onChange={(e) => {
                    setNavbarProps({
                      ...navbarProps,
                      navbarAnimation: e,
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
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec mt-4">
                <label className="mb-2">Side Drawer Alignment (Mobile)</label>
                <Select
                  isClearable
                  placeholder={"Select alignment"}
                  options={drawerAlignmenOptions}
                  value={navbarProps?.menus?.sideDrawerPosition || ""}
                  onChange={(e) => {
                    setNavbarProps({
                      ...navbarProps,
                      menus: {
                        ...navbarProps.menus,
                        sideDrawerPosition: e,
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
            <Col lg={6} md={6}>
              <Row className="mt-4">
                <Col lg={9} md={9}>
                  <label className="mb-2">Side Drawer Color (Mobile)</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.sideDrawerColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          sideDrawerColor: e.target.value,
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
                          sideDrawerColor: "",
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
                  <label className="mb-2">
                    Hamburger Button Color (Mobile)
                  </label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.hamBurgerButtonColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          hamBurgerButtonColor: e.target.value,
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
                          hamBurgerButtonColor: "",
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
                  <label className="mb-2">Close Button Color (Mobile)</label>
                  <input
                    type="color"
                    id="color-picker2"
                    className="w-100"
                    value={navbarProps?.menus?.closeButtonColor || ""}
                    onChange={(e) => {
                      setNavbarProps({
                        ...navbarProps,
                        menus: {
                          ...navbarProps.menus,
                          closeButtonColor: e.target.value,
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
                          closeButtonColor: "",
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
