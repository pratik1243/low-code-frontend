"use client";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { commonPostApiFunction } from "../services/commonApiFunc";
import FieldCustomizeSection from "./FieldCustomizeSection";
import FieldSection from "./FieldSection";
import FormTemplate from "./FormTemplate";
import { IoSaveOutline } from "react-icons/io5";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

export const FormContext = createContext();

const FormCreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const [forms, setForms] = useState([]);
  const [data, setData] = useState();
  const [currentElement, setCurrentElement] = useState();
  const [itemDrag, setItemDrag] = useState(false);
  const [height, setHeight] = useState(false);
  const [containerId, setContainerId] = useState();
  const [pagesList, setPagesList] = useState([]);

  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector((user) => user.auth.authDetails.request_user_id);

  const savePage = async () => {
    try {
      dispatch(setLoader(true));
      const pageData = JSON.parse(localStorage.getItem("page-data"));
      const requestData = {
        key: "bvghtyy",
        payload: {
          page_id: pageData?.page_id,
          page_name: pageData?.page_name,
          page_route: pageData?.page_link,
          page_data: forms,
          request_user_id: requestUserId,
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        router.push("/page-list");
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {}
  };

  const editPage = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "khftrey",
        payload: {
          id: data._id,
          datas: {
            page_id: data?.page_id,
            page_name: data?.page_name,
            page_route: data?.page_link,
            page_data: forms,
            request_user_id: requestUserId,
          },
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        router.push("/page-list");
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const fetchPage = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        payload: { page_id: params.id, request_user_id: requestUserId },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        setData(response?.data?.responseData[0]);
        setForms(response?.data?.responseData[0]?.page_data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const fetchPagesList = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        payload: { request_user_id: requestUserId },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        let page_list = [];
        let data = response?.data?.responseData;
        for (let index = 0; index < data?.length; index++) {
          page_list.push({
            page_route: data[index]?.page_route ? `/web-page/${data[index]?.page_route}` : null,
            page_name: data[index]?.page_name,
            page_data: data[index]?.page_data,
            page_item_url: `/page/${data[index]?.page_id}`,
          });
        }
        setPagesList(page_list);
      } else {
        setPagesList([]);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setPagesList([]);
    }
  };

  // const fetchPaging = async () => {
  //   const requestData = {
  //     key: "bdgerty",
  //     payload: {
  //       collectionName: "Pages_Dats",
  //     },
  //   };
  //   const response = await commonPostApiFunction(requestData);
  //   console.log('response', response);
  // };

  useEffect(() => {
    if (params.id !== "create") {
      fetchPage();
    } else {
      dispatch(setLoader(false));
    }
    fetchPagesList();
  }, []);

  return (
    <div className="mx-4 mt-4 element-create-sec">
      <FormContext
        value={{
          forms,
          setForms,
          itemDrag,
          height,
          setHeight,
          pagesList,
          setItemDrag,
          currentElement,
          containerId,
          setContainerId,
          setCurrentElement,
        }}
      >
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
            <Row className="align-items-center">
              <Col lg={3} md={3} sm={12} xs={12}>
                <h4>{data?.page_name}</h4>
              </Col>
              <Col lg={7} md={7} sm={12} xs={12}>
                <p className="mb-0">
                  Abjust columns width to fit elements in row
                </p>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <div className="publish-btn-sec">
                  <button
                    onClick={() => {
                      if (params.id !== "create") {
                        editPage();
                      } else {
                        savePage();
                      }
                    }}
                  >
                    <IoSaveOutline /> Publish Page
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
          {currentElement && (
            <Col lg={3} md={3} sm={12} xs={12}>
              <FieldCustomizeSection />
            </Col>
          )}
          <Col
            lg={currentElement ? 7 : 8}
            md={currentElement ? 7 : 8}
            sm={12}
            xs={12}
          >
            <FormTemplate />
          </Col>
          <Col
            lg={currentElement ? 2 : 4}
            md={currentElement ? 2 : 4}
            sm={12}
            xs={12}
          >
            <FieldSection />
          </Col>
        </Row>
      </FormContext>
    </div>
  );
};

export default FormCreate;
