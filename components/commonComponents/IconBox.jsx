"use client"
import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { useSelector } from "react-redux";
import { FormContext } from "../FormCreate";
import { useState, useEffect } from "react";
import { debounce } from "../../utils/utilFunctions";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import { commonPostApiFunction } from "../../services/commonApiFunc";

const IconBox = ({ open, handleClose, onCustomizeElement }) => {
  const { forms } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const [loader, setLoader] = useState(false);
  const [icons, setIcons] = useState([]);

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

  const debouncedSearch = debounce(fetchIcons, 500);
  const setIconType = (icon) => {
    onCustomizeElement(icon, "iconName", "select", forms);
    handleClose();
  };

  useEffect(() => {
    setIcons([]);
  }, [open]);

  return (
    <Modal show={open} size="xl" onHide={handleClose} className="icon-box">
      <Modal.Header closeButton>
        <Modal.Title>Add Icons</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="icon-search-input">
          <Row className="align-items-center justify-content-center">
            <Col lg={7} md={7}>
              <input
                type="text"
                placeholder="Search icons here..."
                onChange={debouncedSearch}
              />
            </Col>
          </Row>
        </div>

        <div className={`icons-list ${loader ? "no-grid" : ""}`}>
          {loader ? (
            <div className="text-center my-5">
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
      </Modal.Body>
    </Modal>
  );
};

export default IconBox;
