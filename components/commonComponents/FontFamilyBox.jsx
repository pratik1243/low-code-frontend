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

const FontFamilyBox = () => {
  const { setSelectedFont, setFontModal } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const [loader, setLoader] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [fontValue, setFonValue] = useState("");

  const fetchFonts = async (e) => {
    setLoader(true);
    try {
      const requestData = {
        key: "qsdervbg",
        payload: { font_name: e.target.value || "" },
      };
      const response = await commonPostApiFunction(requestData, token);
      setLoader(false);
      if (response.status == 200) {
        setFonts(response.data);
      } else {
        setFonts([]);
      }
    } catch (error) {
      setFonts([]);
    }
  };

  const clearValue = () => {
    setFonts([]);
    setFonValue("");
  };

  const debouncedHandler = debounce(fetchFonts, 500);

  return (
    <div className="font-box">
      <div className="font-search-input">
        <Row className="align-items-center">
          <Col lg={2} md={2}>
            <Button
              variant={"primary"}
              className="go-back-btn"
              onClick={() => {
                setFontModal(false);
              }}
            >
              <IoMdArrowBack size={18} /> &nbsp;&nbsp;Back
            </Button>
          </Col>
          <Col lg={10} md={10}>
            <div className="position-relative icon-pl">
              <input
                type="text"
                value={fontValue}
                onInput={(e) => {
                  setFonValue(e.target.value);
                }}
                onChange={debouncedHandler}
                placeholder="Search fonts here..."
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

      <div className={`fonts-list ${loader ? "no-grid" : ""}`}>
        {loader ? (
          <div className="text-center mt-5 mb-5">
            <Spinner animation="border" variant="primary" />
            <h5 className="mt-2">Please wait loading fonts...</h5>
          </div>
        ) : (
          fonts.length > 0 &&
          fonts.map((ele, i) => {
            return (
              <div
                key={i}
                className="font-sec"
                onClick={() => {
                  setSelectedFont(ele);
                  setFontModal(false);
                }}
              >
                {ele?.split("-").join(" ")}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FontFamilyBox;
