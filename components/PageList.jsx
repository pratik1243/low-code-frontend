"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { commonPostApiFunction } from "../services/commonApiFunc";
import { generateId } from "../utils/utilFunctions";
import Loader from "./commonComponents/Loader";

const PageList = () => {
  const router = useRouter();
  const [pagesList, setPagesList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    page_name: "",
    page_link: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onPageCreate = () => {
    const data = { ...formData, page_id: `${generateId(4)}` };
    localStorage.setItem("page-data", JSON.stringify(data));
    router.push("/page/create");
  };

  const fetchPagesList = async () => {
    try {
      setLoader(true);
      const requestData = {
        key: "hfgftrj",
      };
      const response = await commonPostApiFunction(requestData);
      setLoader(false);

      if (response.status == 200) {
        setPagesList(response.data.responseData);
        localStorage.setItem("page-data", null);
      } else {
      }
    } catch (error) {
      setLoader(false);
    }
  };
  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchPagesList();
  }, []);

  return (
    <div>
     <Loader loader={loader} />
      <Container>
        <Row>
          <Col lg={9} md={9} sm={12} xs={12}></Col>
          <Col lg={3} md={3} sm={12} xs={12}>
            <Button
              variant={"primary"}
              className={"mr-auto"}
              onClick={() => {
                handleShow();
              }}
            >
              Add Page
            </Button>
          </Col>
        </Row>
        <div className="page-list-sec mt-5">
          <Row>
            {pagesList?.map((ele, i) => {
              return (
                <Col key={i} lg={4} md={4} sm={12} xs={12}>
                  <div
                    key={i}
                    className="page-section-tab"
                    onClick={() => {
                      router.push(`/page/${ele?.page_id}`);
                    }}
                  >
                    {ele?.page_name}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Create Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="page-create-sec">
            <div>
              <label>Page Name</label>
              <input
                type="text"
                name="page_name"
                onChange={(e) => formChange(e)}
              />
            </div>

            <div>
              <label>Page Route</label>
              <input
                type="text"
                name="page_link"
                onChange={(e) => formChange(e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={formData.page_name ? false : true}
            onClick={onPageCreate}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PageList;
