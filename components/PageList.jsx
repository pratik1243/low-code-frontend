"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetails } from "../redux/slices/authSlice";
import { setLoader } from "../redux/slices/loaderSlice";
import { commonPostApiFunction } from "../services/commonApiFunc";
import { generateId, snackProps } from "../utils/utilFunctions";
import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { setPageCreateDetails } from "../redux/slices/pageCreateSlice";
import { toast } from "react-toastify";

const PageList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pagesList, setPagesList] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    page_name: "",
    page_link: "",
    base_page_link: "",
    page_item: false,
  });

  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector((user) => user.auth.authDetails?.request_user_id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onPageCreate = () => {
    const data = { ...formData, page_id: `${generateId(4)}` };
    dispatch(setPageCreateDetails(data));
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
        toast.success(response?.data?.message, snackProps);
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    if (name == "page_item") {
      setFormData({
        ...formData,
        page_item: e.target.checked,
        page_link: "",
        base_page_link: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const deletePage = async (e, id) => {
    e.stopPropagation();
    try {
      dispatch(setLoader(true));
      const response = await axios.post(`${API_BASE_URL}/delete-page/${id}`, data);
      dispatch(setLoader(false));
      if (response.status == 200) {
        toast.success(response?.data?.message, snackProps);
        fetchPagesList();
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error("Something Went Wrong!", snackProps);
    }
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
                    toast.success("Logout Succesfully!", snackProps);
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
                    <div role="button" onClick={(e)=> deletePage(e, ele?._id)}>
                      <MdDeleteOutline size={24} color="red" />
                    </div>                    
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Create Page {formData.page_item && "Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="page-create-sec">
            <div>
              <label>
                Page Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="page_name"
                placeholder="Enter page name"
                onChange={(e) => formChange(e)}
              />
            </div>
            {!formData.page_item && (
              <>
                <div className="mt-4">
                  <label>
                    Base Page Route <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="base_page_link"
                    placeholder="Enter base route"
                    onChange={(e) => formChange(e)}
                  />
                </div>
                <div className="mt-4">
                  <label>
                    Page Route <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="page_link"
                    placeholder="Enter page route"
                    onChange={(e) => formChange(e)}
                  />
                </div>
              </>
            )}

            <div className="mt-4">
              <div className="d-flex check-box">
                <input
                  type="checkbox"
                  id="is-page-item"
                  name="page_item"
                  onChange={(e) => formChange(e)}
                />
                <label htmlFor="is-page-item" className="mb-0">
                  Create as page item
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          {formData.page_item ? (
            <Button
              variant="primary"
              className="page-create-btn"
              onClick={onPageCreate}
              disabled={!formData.page_name}
            >
              Create Page Item
            </Button>
          ) : (
            <Button
              variant="primary"
              className="page-create-btn"
              disabled={
                formData.page_name &&
                (formData.base_page_link || formData.page_link)
                  ? false
                  : true
              }
              onClick={onPageCreate}
            >
              Create Page
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PageList;
