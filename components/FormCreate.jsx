"use client";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { commonPostApiFunction } from "../services/commonApiFunc";
import Loader from "./commonComponents/Loader";
import FieldCustomizeSection from "./FieldCustomizeSection";
import FieldSection from "./FieldSection";
import FormTemplate from "./FormTemplate";
import { IoSaveOutline } from "react-icons/io5";

export const FormContext = createContext();

const FormCreate = () => {
  const router = useRouter();
  const params = useParams();
  const [forms, setForms] = useState([]);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();
  const [currentElement, setCurrentElement] = useState();
  const [itemDrag, setItemDrag] = useState(false);
  const [height, setHeight] = useState(false);
  const [containerId, setContainerId] = useState();
  const [containerItemDrag, setContainerItemDrag] = useState();
  const [pagesList, setPagesList] = useState([]);
  const [pagesItemList, setPagesItemList] = useState([]);

  const savePage = async () => {
    try {
      setLoader(true);
      const pageData = JSON.parse(localStorage.getItem("page-data"));
      const requestData = {
        key: "bvghtyy",
        payload: {
          page_id: pageData?.page_id,
          page_name: pageData?.page_name,
          page_route: pageData?.page_link,
          page_data: forms,
        },
      };
      const response = await commonPostApiFunction(requestData);
      setLoader(false);
      if (response.status == 200) {
        router.push("/page-list");
      } else {
        alert(response.data.message);
      }
    } catch (error) {}
  };

  const editPage = async () => {
    try {
      setLoader(true);
      const requestData = {
        key: "khftrey",
        payload: {
          id: data._id,
          datas: {
            page_id: data?.page_id,
            page_name: data?.page_name,
            page_route: data?.page_link,
            page_data: forms,
          },
        },
      };
      const response = await commonPostApiFunction(requestData);
      setLoader(false);
      if (response.status == 200) {
        router.push("/page-list");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchPage = async () => {
    try {
      setLoader(true);
      const requestData = {
        key: "hfgftrj",
        payload: { page_id: params.id },
      };
      const response = await commonPostApiFunction(requestData);
      setLoader(false);
      if (response.status == 200) {
        setData(response?.data?.responseData[0]);
        setForms(response?.data?.responseData[0]?.page_data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
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
        let page_list = [];
        let page_items = [];
        let data = response?.data?.responseData;
        for (let index = 0; index < data?.length; index++) {
          if (data[index]?.page_route) {
            page_list.push({
              value: `/web-page/${data[index]?.page_route}`,
              label: data[index]?.page_name,
            });
          } else {
            page_items.push({
              label: data[index]?.page_name,
              value: data[index]?.page_data,
              url: `/page/${data[index]?.page_id}`,
            });
          }
        }
        setPagesList(page_list);
        setPagesItemList(page_items);
      } else {
        setPagesList([]);
        setPagesItemList([]);
      }
    } catch (error) {
      setLoader(false);
      setPagesList([]);
      setPagesItemList([]);
    }
  };

  useEffect(() => {
    if (params.id !== "create") {
      fetchPage();
    } else {
      setLoader(false);
    }
    fetchPagesList();
  }, []);

  return (
    <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
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
              containerItemDrag,
              pagesItemList,
              setContainerItemDrag,
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
      )}
    </>
  );
};

export default FormCreate;
