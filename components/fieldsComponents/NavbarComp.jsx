"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { PageContext } from "../WebPage";

const NavbarComp = () => {
  const { forms, setForms, pagesList } = useContext(PageContext);

  return (
    <div className="navbar-section">
      <Row>
        <Col lg={6} md={6}></Col>

        <Col lg={6} md={6}>
          <div className="nav-link-sec">
            {pagesList.map((ele, i) => {
              if (ele?.page_route) {
                return (
                  <Link key={i} href={`/web-page/${ele?.page_route}`}>
                    {ele?.page_name}
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavbarComp;
