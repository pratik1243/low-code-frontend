"use client";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { commonPostApiFunction } from "../services/commonApiFunc";
import FieldCustomizeSection from "./FieldCustomizeSection";
import FontFamilyBox from "./commonComponents/FontFamilyBox";
import { IoMdArrowBack } from "react-icons/io";
import FieldSection from "./FieldSection";
import FormTemplate from "./FormTemplate";
import { IoSaveOutline } from "react-icons/io5";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { responsiveScreenSizes } from "../utils/utilFunctions";
import { setSnackbarProps } from "../redux/slices/snackbarSlice";
import Select from "react-select";

export const FormContext = createContext();

const FormCreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const [forms, setForms] = useState({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });
  const [data, setData] = useState();
  const [currentElement, setCurrentElement] = useState();
  const [itemDrag, setItemDrag] = useState(false);
  const [selectedFont, setSelectedFont] = useState();
  const [height, setHeight] = useState(false);
  const [containerId, setContainerId] = useState();
  const [containerIndex, setContainerIndex] = useState();
  const [breakPoint, setBreakPoint] = useState("lg");
  const [pagesList, setPagesList] = useState([]);
  const [fontModal, setFontModal] = useState(false);
  const [showCurrentElement, setShowCurrentElement] = useState(false);
  const [openImageModel, setOpenImageModel] = useState(false);
  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector(
    (user) => user.auth.authDetails.request_user_id
  );

  function dataPayload(data) {
    return {
      page_id: data?.page_id,
      page_name: data?.page_name,
      request_user_id: requestUserId,
      page_data: {
        font_family: selectedFont,
        lg: forms.lg,
        md: forms.md,
        sm: forms.sm,
        xs: forms.xs,
      },
      page_route: data?.base_page_link
        ? `${data?.base_page_link}/${data?.page_link}`
        : data?.page_link,
    };
  }

  const savePage = async (isEdit) => {
    try {
      const pageData = JSON.parse(localStorage.getItem("page-data"));
      const requestData = {
        key: isEdit ? "khftrey" : "bvghtyy",
        payload: {
          ...(isEdit
            ? { id: data._id, datas: { ...dataPayload(data) } }
            : { ...dataPayload(pageData) }),
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      if (response.status == 200) {
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
            open: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        setSnackbarProps({
          variant: "Danger",
          message: "Something Went Wrong!",
          open: true,
        })
      );
    }
  };

  const fetchPage = async (sizeData = "lg") => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        payload: {
          page_id: params.id,
          request_user_id: requestUserId,
          break_point: sizeData,
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        const dataArray = response?.data?.responseData;
        setData(dataArray);
        setSelectedFont(response?.data?.responseData?.page_data?.font_family);
        setForms({
          ...forms,
          [sizeData]: dataArray?.page_data?.[sizeData],
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const onScreenSizeChange = (data) => {
    let sizeData = data ? data?.value : "lg";
    fetchPagesList(sizeData);
    setBreakPoint(sizeData);
    fetchPage(sizeData);
    setCurrentElement();
  };

  const fetchPagesList = async (size = "lg") => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "kgasderq",
        payload: { request_user_id: requestUserId },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        let page_list = [];
        let data = response?.data?.responseData;
        for (let index = 0; index < data?.length; index++) {
          page_list.push({
            page_route: data[index]?.page_route
              ? `/web-page/${data[index]?.page_route}`
              : null,
            page_name: data[index]?.page_name,
            page_data: data[index]?.page_data[size],
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
          containerIndex,
          setContainerIndex,
          setItemDrag,
          currentElement,
          containerId,
          setSelectedFont,
          setContainerId,
          setCurrentElement,
          breakPoint,
          setBreakPoint,
          showCurrentElement,
          openImageModel,
          setOpenImageModel,
          setShowCurrentElement,
        }}
      >
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
            <Row className="align-items-center">
              <Col lg={5} md={5} sm={12} xs={12}>
                <h4>{data?.page_name}</h4>
              </Col>
              <Col lg={1} md={1} sm={12} xs={12}>
                <div className="publish-btn-sec">
                  <button
                    onClick={() => {
                      localStorage.setItem("page-data", null);
                      router.push("/page-list");
                    }}
                  >
                    <IoMdArrowBack /> Back
                  </button>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12}>
                <div className="publish-btn-sec d-flex align-items-center">
                  <Select
                    isClearable
                    placeholder={"Select Screen Size"}
                    options={responsiveScreenSizes}
                    onChange={(data) => {
                      onScreenSizeChange(data);
                    }}
                  />
                  <button
                    className="font-select-btn"
                    onClick={() => {
                      setFontModal(true);
                    }}
                  >
                    {selectedFont?.split("-").join(" ") || "Select Font"}
                  </button>
                </div>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <div className="publish-btn-sec">
                  <button
                    className="w-100"
                    onClick={() => {
                      savePage(params.id !== "create");
                    }}
                  >
                    <IoSaveOutline /> Publish Changes
                  </button>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={10} md={10} sm={12} xs={12}>
            <FormTemplate />
          </Col>
          <Col lg={2} md={2} sm={12} xs={12}>
            <FieldSection />
          </Col>
        </Row>
        <FieldCustomizeSection />

        <Modal
          size={"lg"}
          show={fontModal}
          className="font-box"
          onHide={() => {
            setFontModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Font Family</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FontFamilyBox setFontModal={setFontModal} />
          </Modal.Body>
        </Modal>
      </FormContext>
    </div>
  );
};

export default FormCreate;
