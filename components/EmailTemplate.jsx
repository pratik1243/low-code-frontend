"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
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
import { RiExternalLinkLine } from "react-icons/ri";
import { IoSaveOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const EmailTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const [id, setId] = useState();
  const [emailComponents, setEmailComponents] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [currentField, setCurrentField] = useState();
  const [templateName, setTemplateName] = useState("");
  const [templatePreview, setTemplatePreview] = useState(false);
  const [templateBackground, setTemplateBackground] = useState("");
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

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    const filterContentList = [...emailComponents];
    const dragIndex = JSON.parse(e?.dataTransfer?.getData("email-temp-item"));
    const draggedItem = filterContentList[dragIndex];
    filterContentList?.splice(dragIndex, 1);
    filterContentList?.splice(dropIndex, 0, draggedItem);
    setEmailComponents(filterContentList);
  };

  const onDragStart = (e, i) => {
    e.dataTransfer.setData("email-temp-item", i);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const addFields = (data) => {
    setEmailComponents([...emailComponents, { id: generateId(4), ...data }]);
  };

  const emailStr = (content) => {
    let str = "";
    str += "<html>";
    str += "<head>";
    str += '<meta charset="UTF-8" />';
    str += "<title>Email Template</title>";
    str += "</head>";
    str +=
      '<body style="margin: 0; padding: 0; background-color: #d2cece; font-family: Arial, sans-serif">';
    str += `${content?.outerHTML}`;
    str += "</body>";
    str += "</html>";
    return str;
  };

  const dataPayload = (tempId) => {
    const email_template = document.querySelector("#email-template");
    return {
      template_id: tempId ? tempId : `${generateId(4)}`,
      template_name: templateName,
      template_data: {
        data: emailComponents,
        template_background: templateBackground,
        htmlStr: email_template ? emailStr(email_template) : "",
      },
      request_user_id: requestUserId,
    };
  };

  const saveTemplate = async (isEdit) => {
    try {
      const requestData = {
        key: isEdit ? "miqagonr" : "sgrdxery",
        payload: {
          ...(isEdit
            ? { id: id, datas: { ...dataPayload(params.id) } }
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
        setTemplateName(templateData?.template_name || "");
        setEmailComponents(templateData?.template_data?.data || []);
        setTemplateBackground(
          templateData?.template_data?.template_background || ""
        );
      } else {
        setEmailComponents([]);
        dispatch(setLoader(false));
      }
    } catch (error) {
      setEmailComponents([]);
      dispatch(setLoader(false));
    }
  };

  const deleteItem = (id) => {
    const emailTempData = emailComponents.filter((el) => el.id !== id);
    setEmailComponents(emailTempData);
    setCurrentField();
  };

  const renderTemplate = (width, no_delete = null) => {
    return (
      <table
        id="email-template"
        align="center"
        width={width}
        background={templateBackground}
        style={{ background: templateBackground || "" }}
        cellPadding="10"
        cellSpacing="0"
      >
        <tbody>
          {emailComponents?.map((ele, i) => {
            return (
              <tr
                key={i}
                draggable
                onDragOver={(e) => onDragOver(e)}
                onDragStart={(e) => onDragStart(e, i)}
                onDrop={(e) => onDropItem(e, i)}
                onClick={() => setCurrentData(ele, i)}
                className={`${currentField?.id === ele?.id ? "selected" : ""}`}
                onMouseOver={() => {
                  setDeleteId(i);
                }}
                onMouseOut={() => {
                  setDeleteId();
                }}
              >
                <td style={{ ...emailStyles(ele?.props) }}>
                  {renderEmailComponents(ele)}
                  {deleteId == i && !no_delete && (
                    <div
                      role="button"
                      className="email-delete-btn"
                      onClick={() => deleteItem(ele?.id)}
                    >
                      <MdDeleteOutline size={21} color="red" />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td style={{ height: "30px" }}></td>
          </tr>
        </tbody>
      </table>
    );
  };

  const setCurrentData = (ele, i) => {
    setCurrentField(ele);
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
        <Col lg={2} md={2} sm={12} xs={12}>
          <div className="publish-btn-sec">
            <button
              className="w-100"
              onClick={() => {
                router.push("/page-list");
              }}
            >
              <span>
                <IoMdArrowBack size={18} />
              </span>{" "}
              Go Back
            </button>
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <input
            type="text"
            className="template-name mb-4"
            value={templateName || ""}
            placeholder="Enter Template Name"
            onChange={(e) => {
              setTemplateName(e.target.value);
            }}
          />
        </Col>
        <Col lg={2} md={2} sm={12} xs={12}>
          <div className="publish-btn-sec">
            <button
              className="w-100"
              onClick={() => {
                setTemplatePreview(true);
              }}
            >
              <span>
                <RiExternalLinkLine size={18} />
              </span>{" "}
              Preview
            </button>
          </div>
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
              <span>
                {" "}
                <IoSaveOutline size={17} />{" "}
              </span>{" "}
              Publish Template
            </button>
          </div>
        </Col>

        <Col lg={3} md={3} sm={12} xs={12}>
          <CustomizeField
            currentField={currentField}
            emailComponents={emailComponents}
            setEmailComponents={setEmailComponents}
            templateBackground={templateBackground}
            setTemplateBackground={setTemplateBackground}
          />
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
              renderTemplate("80%")
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

      <Modal
        size="lg"
        show={templatePreview}
        className="menu-icon-box"
        onHide={() => {
          setTemplatePreview(false);
        }}
      >
        <Modal.Header closeButton>
          <h5>Template Preview</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">{renderTemplate("100%", true)}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmailTemplate;
