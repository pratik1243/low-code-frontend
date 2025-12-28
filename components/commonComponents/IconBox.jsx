"use client";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FormContext } from "../FormCreate";
import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { debounce } from "../../utils/utilFunctions";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { IoMdArrowBack } from "react-icons/io";
import IconComponent from "./IconComponent";
import emptyImg from "../../public/empty-box.png";
import Image from "next/image";

const IconBox = ({
  onCustomizeElement = null,
  goBack,
  setIcon = null,
  hideBackBtn = null,
}) => {
  const { forms } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const [loader, setLoader] = useState(false);
  const [icons, setIcons] = useState([]);
  const [iconValue, setIconValue] = useState("");

  const fetchIcons = async (e) => {
    setLoader(true);
    try {
      const requestData = {
        key: "aeqwxfrt",
        payload: { icon_name: e.target.value || "" },
      };
      const response = await commonPostApiFunction(requestData, token);
      setLoader(false);
      if (response.status == 200) {
        setIcons(response.data);
      } else {
        setIcons([]);
      }
    } catch (error) {
      setIcons([]);
    }
  };

  const setIconType = (icon) => {
    if (onCustomizeElement) {
      onCustomizeElement(icon, "iconName", "select", forms);
    } else {
      setIcon(icon);
    }
    goBack();
  };

  const clearValue = () => {
    setIcons([]);
    setIconValue("");
  };

  const debouncedHandler = debounce(fetchIcons, 500);

  return (
    <>
      <div className="icon-search-input">
        <Row className="align-items-center">
          {!hideBackBtn && (
            <Col lg={2} md={2}>
              <Button
                variant={"primary"}
                className="go-back-btn"
                onClick={() => {
                  goBack();
                  setIcons([]);
                }}
              >
                <IoMdArrowBack size={18} /> &nbsp;&nbsp;Back
              </Button>
            </Col>
          )}

          <Col lg={!hideBackBtn ? 10 : 12} md={!hideBackBtn ? 10 : 12}>
            <div className="position-relative">
              <input
                type="text"
                value={iconValue}
                onInput={(e) => {
                  setIconValue(e.target.value);
                }}
                onChange={debouncedHandler}
                placeholder="Search icons here..."
              />

              <MdOutlineClear
                role="button"
                size={21}
                onClick={clearValue}
                className="icon-clear-btn"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div
        className={`icons-list ${loader || icons.length == 0 ? "no-grid" : ""}`}
      >
        {loader ? (
          <div className="text-center mt-5 mb-5">
            <Spinner animation="border" variant="primary" />
            <h5 className="mt-2">Please wait loading icons...</h5>
          </div>
        ) : icons.length > 0 ? (
          <>
            {icons.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="icon-sec"
                  onClick={() => setIconType(ele)}
                >
                  <IconComponent icon={ele} />
                  <span className="icon-text">{ele?.slice(2)}</span>
                </div>
              );
            })}
          </>
        ) : (
          <div className="py-4 empty-icon-box text-center">
            <Image src={emptyImg} height={160} width={160} alt="menu-empty" />
            <div className="no-menus-txt mt-3 fs-5">No Icons Found!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default IconBox;
