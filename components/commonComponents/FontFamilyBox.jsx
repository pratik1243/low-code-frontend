"use client";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FormContext } from "../FormCreate";
import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { debounce } from "../../utils/utilFunctions";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { commonPostApiFunction } from "../../services/commonApiFunc";

const FontFamilyBox = ({ setFontModal }) => {
  const { setSelectedFont } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const [loader, setLoader] = useState(false);
  const [fonts, setFonts] = useState([]);

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
  };

  const debouncedHandler = debounce(fetchFonts, 500);

  return (
    <>
      <div className="font-search-input">
        <Row>
          <Col lg={12} md={12}>
            <div className="position-relative">
              <input
                type="text"
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
              <div key={i} className="font-sec" onClick={() =>{
                setSelectedFont(ele);
                setFontModal(false);
              }} >
                {ele?.split('-').join(' ')}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default FontFamilyBox;
