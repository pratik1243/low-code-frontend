"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDetails } from "../redux/slices/authSlice";
import { setLoader } from "../redux/slices/loaderSlice";
import { commonPostApiFunction } from "../services/commonApiFunc";
import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { IoSearchSharp } from "react-icons/io5";
import { itemTypeOptions, snackProps } from "../utils/customizeOptions";
import Select from "react-select";
import emptyImg from "../public/empty-box.png";
import AddPageSec from "./AddPageSec";
import { TbReload } from "react-icons/tb";


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
  const [searchValue, setSearchValue] = useState("");
  const [itemType, setItemType] = useState("pages");
  const [templateList, setTemplateList] = useState([]);
  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector(
    (user) => user.auth.authDetails?.request_user_id
  );

  const handleShow = () => {
    setShow(true);
  };

  const fetchPagesList = async (dataType = null) => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: itemType == "email-templates" ? "uawriocb" : "kgasderq",
        payload: {
          request_user_id: requestUserId,
          ...(dataType && {
            [dataType]: searchValue,
          }),
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));

      if (response.status == 200) {
        if (itemType == "email-templates") {
          setTemplateList(response.data.responseData);
        } else {
          setPagesList(response.data.responseData);
        }
        toast.success(response?.data?.message, snackProps);
      } else {
        setTemplateList([]);
        setPagesList([]);
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setTemplateList([]);
      setPagesList([]);
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const deletePage = async (e, delete_id, delete_key) => {
    e.stopPropagation();
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: delete_key,
        payload: { id: delete_id },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        toast.success(response?.data?.message, snackProps);
        fetchPagesList();
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  useEffect(() => {
    fetchPagesList();
  }, [itemType]);

  return (
    <div>
      <Container fluid>
        <div className="low-nav-bar">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}></Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="d-flex align-items-center justify-content-end">
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
                  className={"mr-auto add-page-btn"}
                  onClick={() => {
                    router.push("/template/create");
                  }}
                >
                  <IoIosAdd size={23} /> &nbsp;Email Template
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
          <div className="fixed-filter-sec">
            <div className="items-tab-sec">
              <Select
                isClearable
                placeholder={"Select item type"}
                options={itemTypeOptions}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: "42px",
                    borderRadius: "7px",
                  }),
                }}
                onChange={(data) => {
                  setItemType(data?.value || "pages");
                  setSearchValue("");
                }}
              />
            </div>
            <div className="search-input-sec">
              <input
                type="text"
                value={searchValue}
                placeholder={`Search ${
                  itemType == "pages" ? "page" : "template"
                } here...`}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <IoSearchSharp
                role="button"
                size={20}
                onClick={() => {
                  fetchPagesList(
                    itemType == "pages" ? "page_name" : "template_name"
                  );
                }}
              />
            </div>
            <Button
              variant={"primary"}
              className={"mr-auto clear-btn justify-content-center"}
              onClick={() => {
                setSearchValue("");
                fetchPagesList();
              }}
            >
              <TbReload size={18} /> &nbsp;&nbsp;Clear
            </Button>
          </div>

          <div className="mb-4">
            <h5>
              {itemType == "pages" ? "Pages & Page Items" : "Email Templates"}
            </h5>
          </div>

          {itemType == "pages" && (
            <Row>
              {pagesList?.length == 0 && (
                <Col lg={12}>
                  <div className="no-data-found-sec">
                    <Image
                      src={emptyImg}
                      height={150}
                      width={150}
                      alt="no-data"
                    />
                    <h5>No Pages Found!</h5>
                    <p>Please click on above add button to create pages</p>
                  </div>
                </Col>
              )}

              {pagesList?.length > 0 &&
                pagesList?.map((ele, i) => {
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
                        <div
                          role="button"
                          onClick={(e) => deletePage(e, ele?._id, "qwesdrt")}
                        >
                          <MdDeleteOutline size={24} color="red" />
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          )}
          {itemType == "email-templates" && (
            <Row>
              {templateList?.length == 0 && (
                <Col lg={12}>
                  <div className="no-data-found-sec">
                    <Image
                      src={emptyImg}
                      height={130}
                      width={130}
                      alt="no-data"
                    />
                    <h5>No Templates Found!</h5>
                    <p>Please click on above add button to create templates</p>
                  </div>
                </Col>
              )}

              {templateList?.length > 0 &&
                templateList?.map((ele, i) => {
                  return (
                    <Col key={i} lg={4} md={4} sm={12} xs={12}>
                      <div
                        key={i}
                        className="page-section-tab d-flex align-items-center justify-content-between"
                        onClick={() => {
                          router.push(`/template/${ele?.template_id}`);
                        }}
                      >
                        {ele?.template_name}
                        <div
                          role="button"
                          onClick={(e) => deletePage(e, ele?._id, "jfeqdrov")}
                        >
                          <MdDeleteOutline size={24} color="red" />
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          )}
        </div>
      </Container>
      <AddPageSec
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
      />
    </div>
  );
};

export default PageList;
