"use client";
import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { useSelector } from "react-redux";
import { FormContext } from "../FormCreate";
import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { debounce } from "../../utils/utilFunctions";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { IoMdArrowBack } from "react-icons/io";

const IconBox = ({ onCustomizeElement, goBack }) => {
  const { forms } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const [loader, setLoader] = useState(false);
  const [icons, setIcons] = useState([]);
  const [iconValue, setIconValue] = useState("");

  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };

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
    onCustomizeElement(icon, "iconName", "select", forms);
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
        <Row>
          <Col lg={3} md={3}>
            <Button
              variant={"primary"}
              className="go-back-btn"
              onClick={() => {
                goBack();
                setIcons([]);
              }}
            >
              <IoMdArrowBack size={18} /> &nbsp;&nbsp;Go Back
            </Button>
          </Col>
          <Col lg={9} md={9}>
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

      <div className={`icons-list ${loader ? "no-grid" : ""}`}>
        {loader ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <h5 className="mt-2">Please wait loading icons...</h5>
          </div>
        ) : (
          icons.length > 0 &&
          icons.map((ele, i) => {
            const IconComponent = iconType[ele];
            return (
              <div
                key={i}
                className="icon-sec"
                onClick={() => setIconType(ele)}
              >
                {IconComponent ? <IconComponent /> : null}
                <span className="icon-text">{ele?.slice(2)}</span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default IconBox;
