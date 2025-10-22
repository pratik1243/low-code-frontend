"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetails } from "../redux/slices/authSlice";
import { setLoader } from "../redux/slices/loaderSlice";
import { setSnackbarProps } from "../redux/slices/snackbarSlice";
import { commonPostApiFunction } from "../services/commonApiFunc";
import { generateId } from "../utils/utilFunctions";
import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

const PageList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pagesList, setPagesList] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    page_name: "",
    page_link: "",
    base_page_link: ""
  });

  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector((user) => user.auth.authDetails?.request_user_id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onPageCreate = () => {
    const data = { ...formData, page_id: `${generateId(4)}` };
    localStorage.setItem("page-data", JSON.stringify(data));
    router.push("/page/create");
  };

  const fetchPagesList = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "kgasderq",
        payload: { request_user_id: requestUserId },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));

      if (response.status == 200) {
        setPagesList(response.data.responseData);
        localStorage.setItem("page-data", null);
        dispatch(
          setSnackbarProps({
            variant: "Success",
            message: response?.data?.message,
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
      dispatch(setLoader(false));
      dispatch(
        setSnackbarProps({
          variant: "Danger",
          message: "Something Went Wrong!",
          open: false,
        })
      );
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
      <Container>
        <div className="low-nav-bar">
          <Row>
            <Col lg={9} md={9} sm={12} xs={12}></Col>
            <Col lg={3} md={3} sm={12} xs={12}>
              <div className="d-flex align-items-center ">
                <Button
                  variant={"primary"}
                  className={"mr-auto add-page-btn"}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  <IoIosAdd size={23} /> &nbsp;Add Page
                </Button>
                <Button
                  variant={"primary"}
                  className={"mr-auto logout-btn"}
                  onClick={() => {
                    dispatch(
                      setAuthDetails({
                        token: null,
                        request_user_id: null,
                        user_name: null,
                      })
                    );
                    router.push("/login");
                  }}
                >
                  <MdLogout size={17} /> &nbsp;&nbsp;Log Out
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="page-list-sec">
          <div className="search-input-sec my-5">
            <input type="text" placeholder="Search page here..." />
          </div>
          <Row>
            {pagesList?.map((ele, i) => {
              return (
                <Col key={i} lg={4} md={4} sm={12} xs={12}>
                  <div
                    key={i}
                    className="page-section-tab d-flex align-items-center justify-content-between"
                    onClick={() => {
                      router.push(`/page/${ele?.page_id}`);
                    }}
                  >
                    {ele?.page_name}
                    <MdDeleteOutline size={24} color="red" />
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
              <label>Page Name <span className="text-danger">*</span></label>
              <input
                type="text"
                name="page_name"
                placeholder="Enter page name"
                onChange={(e) => formChange(e)}
              />
            </div>
            <div className="mt-4">
              <label>Base Page Route <span className="text-danger">*</span></label>
              <input
                type="text"
                name="base_page_link"
                placeholder="Enter base route"
                onChange={(e) => formChange(e)}
              />
            </div>
            <div className="mt-4">
              <label>Page Route <span className="text-danger">*</span></label>
              <input
                type="text"
                name="page_link"
                placeholder="Enter page route"
                onChange={(e) => formChange(e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="page-create-btn"
            disabled={formData.page_name ? false : true}
            onClick={onPageCreate}
          >
            Create Page
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PageList;
