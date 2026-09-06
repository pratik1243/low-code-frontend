import React from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import { useContext } from "react";
import IconComponent from "../commonComponents/IconComponent";
import { toast } from "react-toastify";
import { setLoader } from "../../redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { addPixel, errorMessageFunc } from "../../utils/customizePropFunctions";
import { snackProps } from "../../utils/customizeOptions";

const ButtonComp = ({ ele, path, mainIndex = null, cardInnerIndex = null }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isWebPage = path.includes("web-page");
  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext,
  );
  const fieldArray = ele?.props?.fields.map((el) => el?.value);

  const getFieldValue = (data) => {
    return typeof data?.props?.value == "object"
      ? data?.props?.value?.map((e) => e?.value)
      : data?.props?.checked
        ? data?.props?.checked
        : data?.props?.value;
  };

  const sendEmailNotification = async (
    sender_email,
    receiver_email,
    subject,
    title,
    content,
  ) => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "zsaqrtuo",
        payload: {
          from_email: `"${title}" <${sender_email}>`,
          to_email: receiver_email,
          subject: subject,
          text: content,
        },
      };
      const response = await commonPostApiFunction(requestData);
      dispatch(setLoader(false));
      if (response.status == 200) {
        toast.success(response?.data?.message, snackProps);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  const events = () => {
    let isFieldsInvalid = false;
    let mailText = "";
    const formData = {};

    const processField = (field) => {
      const name = field?.props?.name;
      if (!name || !fieldArray.includes(name)) {
        return field;
      }
      const value = getFieldValue(field);
      const validationValue =
        field?.props?.checked ?? field?.props?.value ?? value;
      const errorMessage = errorMessageFunc(field, validationValue);
      if (errorMessage !== "") {
        isFieldsInvalid = true;
      }
      if (
        formData[name] === undefined ||
        (value !== "" && value !== null && value !== undefined)
      ) {
        formData[name] = value;
      }
      return {
        ...field,
        form: {
          ...field?.form,
          error_message: errorMessage,
        },
      };
    };

    const validateForms = forms[breakPoint].map((el, i) => {
      const nestedForm = el?.content?.map((eles) => {
        return processField(eles);
      });
      const cardContentForm = el?.props?.cards?.map((data) => {
        const updatedForm = data?.content?.map((datas) => {
          const cardNestedForm = datas?.content?.map((eles) => {
            return processField(eles);
          });

          if (datas?.content) {
            return {
              ...datas,
              content: cardNestedForm,
            };
          }
          return processField(datas);
        });
        if (data && data?.id === cardInnerIndex) {
          return {
            ...data,
            content: updatedForm,
          };
        }
        const dataIndex = el?.props?.cards?.indexOf(data);
        if (dataIndex === cardInnerIndex) {
          return {
            ...data,
            content: updatedForm,
          };
        }
        return data;
      });
      if (el?.type === "container" && mainIndex === i) {
        return {
          ...el,
          content: nestedForm,
        };
      }
      if (el?.type === "card_box" && mainIndex === i) {
        return {
          ...el,
          props: {
            ...el.props,
            cards: cardContentForm,
          },
        };
      }
      return processField(el);
    });
    if (fieldArray.length > 0) {
      setForms({
        ...forms,
        [breakPoint]: validateForms,
      });
    }
    if (ele?.props?.external_link) {
      router.push(ele?.props?.external_link);
      return;
    }
    if (ele?.props?.redirectUrl?.page_route) {
      router.push(ele?.props?.redirectUrl?.page_route);
      return;
    }    
    if (!isFieldsInvalid) {
      const emailProps = ele?.props?.emailSendProps;
      if (
        emailProps?.sender_email &&
        emailProps?.receiver_email &&
        emailProps?.subject
      ) {
        const htmlContent = emailProps?.content?.htmlContent || "";
        const contentArr = htmlContent.split("{{");
        contentArr.forEach((content) => {
          if (content?.includes("}}")) {
            const [fieldName, remainingText] = content.split("}}");
            const fieldValue = formData[fieldName] ?? "";
            mailText += `${fieldValue}${remainingText || ""}`;
          } else {
            mailText += content;
          }
        });
        sendEmailNotification(
          emailProps.sender_email,
          emailProps.receiver_email,
          emailProps.subject,
          emailProps.title,
          mailText,
        );
      }
    }
  };

  return (
    <Button
      variant={"primary"}
      style={{
        ...(ele?.props?.style && isWebPage && addPixel(ele?.props?.style, ele)),
      }}
      onClick={events}
      className={`d-flex align-items-center justify-content-center w-100 ${
        isWebPage && ele?.props?.isLink ? "link-button" : ""
      }`}
    >
      {ele?.props?.iconPosition == "start" && ele?.props?.iconName && (
        <>
          &nbsp;
          <IconComponent icon={ele?.props?.iconName} size={20} />
        </>
      )}{" "}
      {ele?.props?.text || "Button"}
      {ele?.props?.iconPosition == "end" && ele?.props?.iconName && (
        <>
          &nbsp;
          <IconComponent icon={ele?.props?.iconName} size={20} />
        </>
      )}
    </Button>
  );
};

export default ButtonComp;
