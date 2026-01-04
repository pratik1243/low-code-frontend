"use client";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { commonPostApiFunction } from "../services/commonApiFunc";
import FieldCustomizeSection from "./FieldCustomizeSection";
import { IoMdArrowBack } from "react-icons/io";
import FieldSection from "./FieldSection";
import FormTemplate from "./FormTemplate";
import { IoSaveOutline } from "react-icons/io5";
import { setLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { responsiveScreenSizes, snackProps } from "../utils/utilFunctions";
import { IoSettingsOutline } from "react-icons/io5";
import Select from "react-select";
import SettingBox from "./commonComponents/SettingBox";
import { RiExternalLinkLine } from "react-icons/ri";
import { setPageCreateDetails } from "../redux/slices/pageCreateSlice";
import { toast } from "react-toastify";

export const FormContext = createContext();

const FormCreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const elementContainerRef = useRef(null);
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
  const [fieldType, setFieldType] = useState();
  const [scrollAnimationType, setScrollAnimationType] = useState();
  const [pageBackground, setPageBackground] = useState("");
  const [containerId, setContainerId] = useState(null);
  const [containerIndex, setContainerIndex] = useState();
  const [breakPoint, setBreakPoint] = useState("lg");
  const [pagesList, setPagesList] = useState([]);
  const [fontModal, setFontModal] = useState(false);
  const [openSettingModel, setOpenSettingModel] = useState(false);
  const [showCurrentElement, setShowCurrentElement] = useState(false);
  const [openImageModel, setOpenImageModel] = useState(false);
  const [showIconBox, setShowIconBox] = useState(false);
  const [navbarProps, setNavbarProps] = useState({
    hidden: false,
    navBackgroundColor: "",
    menuTemplate: "",
    logo: {
      columnWidth: 50,
      width: "",
      height: "",
      logoUrl: "",
    },
    menus: {
      menuList: [],
      columnWidth: 50,
      menuColor: "",
      subMenuColor: "",
      menuDropdownColor: "",
      menuDropdownAnimation: "",
    },
  });
  const [navSettings, setNavSettings] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector((user) => user.auth.authDetails.request_user_id);
  const pageData = useSelector((user) => user.pageCreate.pageCreateDetails);

  function dataPayload(data) {
    return {
      page_id: data?.page_id,
      page_name: data?.page_name,
      request_user_id: requestUserId,
      page_data: {
        font_family: selectedFont,
        field_type: fieldType,
        page_background: pageBackground,
        scroll_animation_type: scrollAnimationType,
        navbar_props: navbarProps,
        screenSize: {
          lg: forms.lg,
          md: forms.md,
          sm: forms.sm,
          xs: forms.xs,
        },
      },
      page_item: data?.page_item,
      page_route: data?.base_page_link
        ? `${data?.base_page_link}/${data?.page_link}`
        : data?.page_link,
    };
  }

  const savePage = async (isEdit) => {
    try {
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
        if (!isEdit) {
          router.push("/page-list");
        }
        dispatch(setPageCreateDetails(null));
        toast.success(response?.data?.message, snackProps);
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const fetchPage = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "hfgftrj",
        payload: {
          page_id: params.id,
          request_user_id: requestUserId,
          break_point: null,
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        const dataArray = response?.data?.responseData;
        setData(dataArray);
        setSelectedFont(dataArray?.font_family);
        setFieldType(dataArray?.field_type);
        setScrollAnimationType(dataArray?.scroll_animation_type);
        setPageBackground(dataArray?.page_background);
        setNavbarProps(dataArray?.navbar_props);
        setForms({
          ...forms,
          lg:
            dataArray?.screenSize?.lg?.length > 0
              ? dataArray?.screenSize?.lg
              : forms?.lg,
          md:
            dataArray?.screenSize?.md?.length > 0
              ? dataArray?.screenSize?.md
              : forms?.md,
          sm:
            dataArray?.screenSize?.sm?.length > 0
              ? dataArray?.screenSize?.sm
              : forms?.sm,
          xs:
            dataArray?.screenSize?.xs?.length > 0
              ? dataArray?.screenSize?.xs
              : forms?.xs,
        });
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const onScreenSizeChange = (data) => {
    let sizeData = data ? data?.value : "lg";
    setBreakPoint(sizeData);
    setCurrentElement();
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
        let page_list = [];
        let data = response?.data?.responseData;
        for (let index = 0; index < data?.length; index++) {
          page_list.push({
            page_route: data[index]?.page_route ? `/web-page/${data[index]?.page_route}` : null,
            page_name: data[index]?.page_name,
            page_item: data[index]?.page_item,
            page_data: data[index]?.page_data?.screenSize,
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
          openSettingModel,
          setOpenSettingModel,
          setContainerIndex,
          setItemDrag,
          currentElement,
          containerId,
          setSelectedFont,
          setContainerId,
          setCurrentElement,
          breakPoint,
          fontModal,
          navSettings,
          setNavSettings,
          setFontModal,
          setBreakPoint,
          selectedFont,
          fieldType,
          setFieldType,
          showIconBox,
          setShowIconBox,
          setScrollAnimationType,
          setPageBackground,
          scrollAnimationType,
          pageBackground,
          showCurrentElement,
          openImageModel,
          setOpenImageModel,
          navbarProps,
          menuIndex,
          setMenuIndex,
          isSubMenuOpen,
          setIsSubMenuOpen,
          setNavbarProps,
          setShowCurrentElement,
          elementContainerRef
        }}
      >
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
            <Row className="align-items-center">
              <Col
                lg={4}
                md={4}
                sm={12}
                xs={12}
              >
                <h4>{pageData?.page_name || data?.page_name}</h4>
              </Col>
              <Col lg={1} md={1} sm={12} xs={12}>
                <div className="publish-btn-sec">
                  <button
                    onClick={() => {
                      dispatch(setPageCreateDetails(null));
                      router.push("/page-list");
                    }}
                  >
                    <IoMdArrowBack size={17} /> Back
                  </button>
                </div>
              </Col>
              <Col lg={5} md={5} sm={12} xs={12}>
                <div className="publish-btn-sec d-flex align-items-center">
                  <Select
                    isClearable
                    isDisabled={pageData?.page_item || data?.page_item}
                    placeholder={"Select Screen Size"}
                    options={responsiveScreenSizes}
                    onChange={(data) => {
                      onScreenSizeChange(data);
                    }}
                  />
                  <button
                    className="web-settings-btn"
                    disabled={pageData?.page_item || data?.page_item}
                    onClick={() => {
                      setOpenSettingModel(true);
                    }}
                  >
                    <IoSettingsOutline size={18} /> Settings
                  </button>
                  <a
                    role={"button"}
                    disabled={pageData?.page_item || data?.page_item}
                    className="web-settings-btn"
                    href={`/web-page/${data?.page_route}`}
                    target={"_blank"}
                  >
                    <RiExternalLinkLine size={18} /> Preview
                  </a>
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
                    <IoSaveOutline size={17} /> Publish Changes
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
        <SettingBox />
      </FormContext>
    </div>
  );
};

export default FormCreate;
