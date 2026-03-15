"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Footer from "./mailerComponents/Footer";
import Heading from "./mailerComponents/Heading";
import Paragraph from "./mailerComponents/Paragraph";
import Link from "./mailerComponents/Link";
import ImageComp from "./mailerComponents/Image";
import ButtonComp from "./mailerComponents/Button";
import { emailComponentData, snackProps } from "../utils/customizeOptions";
import { emailStyles, generateId } from "../utils/customizePropFunctions";
import CustomizeField from "./mailerComponents/CustomizeField";
import { commonPostApiFunction } from "../services/commonApiFunc";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/slices/loaderSlice";
import { IoMdArrowBack } from "react-icons/io";
import emptyImg from "../public/empty-box.png";
import Image from "next/image";

const EmailTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const tableRef = useRef();
  const [id, setId] = useState();
  const [emailComponents, setEmailComponents] = useState([]);
  const [containerId, setContainerId] = useState();
  const [currentField, setCurrentField] = useState();
  const [templateName, setTemplateName] = useState("");
  const token = useSelector((user) => user.auth.authDetails.token);
  const requestUserId = useSelector(
    (user) => user.auth.authDetails.request_user_id
  );

  const renderEmailComponents = (data) => {
    if (data.type == "footer") {
      return <Footer data={data} />;
    } else if (data.type == "heading") {
      return <Heading data={data} />;
    } else if (data.type == "paragraph") {
      return <Paragraph data={data} />;
    } else if (data.type == "link") {
      return <Link data={data} />;
    } else if (data.type == "image") {
      return <ImageComp data={data} />;
    } else if (data.type == "button") {
      return <ButtonComp data={data} />;
    } else {
      return null;
    }
  };

  const addFields = (data) => {
    const updateFields = emailComponents?.map((ele, i) => {
      if (i == containerId && currentField?.type == "container") {
        return {
          ...ele,
          props: {
            ...ele.props,
            content: [...ele.props.content, { id: generateId(4), ...data }],
          },
        };
      }
      return ele;
    });
    setEmailComponents(
      currentField?.type == "container"
        ? updateFields
        : [...emailComponents, { id: generateId(4), ...data }]
    );
  };

  const emailStr = (content) => {
    let str = "";
    str += "<html>";
    str += "<head>";
    str += '<meta charset="UTF-8" />';
    str += "<title>Email Template</title>";
    str += "</head>";
    str +=
      '<body style="margin: 0; padding: 0; background-color: #a9a1a1; font-family: Arial, sans-serif">';
    str += `${content?.outerHTML}`;
    str += "</body>";
    str += "</html>";
    return str;
  };

  function dataPayload() {
    return {
      template_id: `${generateId(4)}`,
      template_name: templateName,
      template_data: {
        data: emailComponents,
        htmlStr: emailStr(tableRef?.current),
      },
      request_user_id: requestUserId,
    };
  }

  const saveTemplate = async (isEdit) => {
    try {
      const requestData = {
        key: isEdit ? "miqagonr" : "sgrdxery",
        payload: {
          ...(isEdit
            ? { id: id, datas: { ...dataPayload() } }
            : { ...dataPayload() }),
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      if (response.status == 200) {
        if (!isEdit) {
          router.push("/page-list");
        }
        toast.success(response?.data?.message, snackProps);
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const fetchTemplate = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "lopawqcj",
        payload: {
          template_id: params.id,
          request_user_id: requestUserId,
        },
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        const templateData = response?.data?.responseData;
        setId(templateData?._id);
        setTemplateName(templateData?.template_name);
        setEmailComponents(templateData?.template_data?.data || []);
      } else {
        setEmailComponents([]);
        dispatch(setLoader(false));
      }
    } catch (error) {
      setEmailComponents([]);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (params.id !== "create") {
      fetchTemplate();
    } else {
      dispatch(setLoader(false));
    }
  }, []);

  return (
    <div className="email-template-create-sec p-4">
      <Row>
        <Col lg={1} md={1} sm={12} xs={12}>
          <div className="publish-btn-sec">
            <button
              className="w-100"
              onClick={() => {
                router.push("/page-list");
              }}
            >
              <IoMdArrowBack size={17} /> Back
            </button>
          </div>
        </Col>
        <Col lg={9} md={9} sm={12} xs={12}>
          <input
            type="text"
            className="template-name mb-4"
            value={templateName}
            placeholder="Enter Template Name"
            onChange={(e) => {
              setTemplateName(e.target.value);
            }}
          />
        </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
          <div className="publish-btn-sec">
            <button
              className="w-100 mb-4"
              disabled={emailComponents?.length && templateName ? false : true}
              onClick={() => {
                if (emailComponents?.length && templateName) {
                  saveTemplate(params.id !== "create");
                }
              }}
            >
              Publish Template
            </button>
          </div>
        </Col>
        <Col lg={3} md={3} sm={12} xs={12}>
          <CustomizeField
            containerId={containerId}
            currentField={currentField}
            emailComponents={emailComponents}
            setEmailComponents={setEmailComponents}
          />{" "}
        </Col>
        <Col lg={7} md={7} sm={12} xs={12}>
          <div className="email-content-layout">
            {emailComponents?.length == 0 ? (
              <div className="pt-4 pb-2 text-center">
                <Image
                  src={emptyImg}
                  height={130}
                  width={130}
                  alt="menu-empty"
                />
                <div className="no-menus-txt fs-5 text-dark">
                  Click on elements to add...
                </div>
              </div>
            ) : (
              <table
                ref={tableRef}
                align="center"
                width="80%"
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  {emailComponents?.map((ele, i) => {
                    return (
                      <tr
                        key={i}
                        onClick={() => {
                          if (ele?.type == "container") {
                            setContainerId(i);
                          }
                          setCurrentField(ele);
                        }}
                        className={`${
                          containerId === i
                            ? "selected2"
                            : currentField?.id === ele?.id
                            ? "selected"
                            : ""
                        }`}
                      >
                        {ele?.type === "container" ? (
                          <td>
                            <table>
                              <tbody>
                                {ele?.props?.content?.length == 0 ? (
                                  <tr>
                                    <td>Container</td>
                                  </tr>
                                ) : (
                                  <tr>
                                    {ele?.props?.content?.map((el, id) => {
                                      return (
                                        <td
                                          key={id}
                                          className={`${
                                            currentField?.id === el?.id
                                              ? "selected"
                                              : ""
                                          }`}
                                          style={{ ...emailStyles(el?.props) }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentField(el);
                                          }}
                                        >
                                          {renderEmailComponents(el)}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        ) : (
                          <td style={{ ...emailStyles(ele?.props) }}>
                            {renderEmailComponents(ele)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  <tr>
                    <td style={{ height: "20px" }}></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
          <div className="email-add-btn-sec">
            {emailComponentData?.map((ele, i) => {
              return (
                <Button
                  key={i}
                  className="field-option"
                  onClick={() => addFields(ele)}
                >
                  {ele?.label}
                </Button>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmailTemplate;
