import React from "react";
import { useContext, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FormContext } from "../FormCreate";
import { API_BASE_URL } from "../../services/endpoints";
import Image from "next/image";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import AddMenuContent from "./AddMenuContent";

function NavbarCustomize({ menuIndex, setMenuIndex }) {
  const dispatch = useDispatch();
  const { navbarProps, setNavbarProps, setNavSettings } = useContext(FormContext);
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
        <AddMenuContent menuIndex={menuIndex} setMenuIndex={setMenuIndex} />
      </Container>
    </div>
  );
}

export default NavbarCustomize;
