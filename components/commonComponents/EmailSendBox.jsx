"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import { IoMdArrowBack } from "react-icons/io";

function EmailSendBox({ onCustomizeElement, currentField }) {

  const { forms, setOpenEmailSendBox } = useContext(FormContext);
  const [emailSendProps, setEmailSendProps] = useState({
    receiver_email: "",
    sender_email: "",
    title: "",
    subject: "",
    content: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setEmailSendProps({ ...emailSendProps, [name]: value });
  };

  useEffect(() => {
    onCustomizeElement(emailSendProps, "emailSendProps", "select", forms);
  }, [emailSendProps]);

  useEffect(() => {
    setEmailSendProps(currentField?.props?.emailSendProps);
  }, []);

  return (
    <div>
      <div className="mb-4 mt-2">
        <Button
          variant={"primary"}
          className="go-back-btn"
          onClick={() => {
            setOpenEmailSendBox(false);
          }}
        >
          <IoMdArrowBack size={18} /> &nbsp;&nbsp;Back
        </Button>
      </div>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec mt-2">
            <label className="mb-2 fs-6">Sender Email</label>
            <input
              type="text"
              value={emailSendProps?.sender_email || ""}
              name="sender_email"
              className="customize-input"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec mt-2">
            <label className="mb-2 fs-6">Receiver Email</label>
            <input
              type="text"
              value={emailSendProps?.receiver_email || ""}
              name="receiver_email"
              className="customize-input"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec mt-2">
            <label className="mb-2 fs-6">Email Title</label>
            <input
              type="text"
              value={emailSendProps?.title || ""}
              name="title"
              className="customize-input"
              placeholder="Enter title"
              onChange={onChange}
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec mt-2">
            <label className="mb-2 fs-6">Subject</label>
            <input
              type="text"
              value={emailSendProps?.subject || ""}
              name="subject"
              className="customize-input"
              placeholder="Enter subject"
              onChange={onChange}
            />
          </div>
        </Col>

        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="customize-prop-sec mt-2">
            <label className="mb-2 fs-6">Content</label>
            <textarea
              value={emailSendProps?.content || ""}
              name="content"
              className="customize-input"
              placeholder="Enter content"
              onChange={onChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmailSendBox;
