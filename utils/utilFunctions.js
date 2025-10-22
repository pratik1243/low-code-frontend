import { Readable } from "stream";
import { useState, useEffect } from "react";

export function generateId(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const fieldsData = [
  {
    label_text: "Text Field",
    type: "input",
    column_width: 100,
    props: {
      label: "",
      value: "",
      required: false,
      hidden: false,
      placeholder: "",
      maxLength: "",
      name: "",
      align: "",
      width: 100,
      style: {},
      animation: "",
      animation_delay: "",
      floatLabel: false,
      standard: false,
      isPassword: false,
    },
    form: {
      regex: "",
      error_message: "",
    },
  },
  {
    label_text: "Select Field",
    type: "select",
    column_width: 100,
    props: {
      value: "",
      label: "",
      required: false,
      hidden: false,
      placeholder: "",
      name: "",
      multiple: false,
      options: [],
      width: 100,
      align: "",
      style: {},
      animation: "",
      animation_delay: "",
      floatLabel: false,
      standard: false,
    },
    form: {
      error_message: "",
    },
  },
  {
    label_text: "Paragraph",
    type: "paragraph",
    column_width: 100,
    props: {
      text: "",
      width: 100,
      align: "",
      style: {},
      animation: "",
      animation_delay: "",
    },
  },
  {
    label_text: "Heading",
    type: "heading",
    column_width: 100,
    props: {
      text: "",
      width: 100,
      variant: "",
      align: "",
      style: {},
      animation: "",
      animation_delay: "",
    },
  },
  {
    type: "button",
    label_text: "Button",
    column_width: 100,
    props: {
      text: "",
      variant: "standard",
      hidden: false,
      iconPosition: "none",
      iconName: "",
      hover_color: "",
      align: "",
      redirectUrl: "",
      width: 100,
      style: {},
      animation: "",
      fields: [],
      animation_delay: "",
    },
  },
  {
    type: "divider",
    label_text: "Divider",
    column_width: 100,
    props: {
      color: "",
      hidden: false,
      width: 100,
    },
  },
  {
    type: "container",
    label_text: "Container",
    column_width: 100,
    content: [],
    props: {
      hidden: false,
      width: 100,
      imageData: {
        url: "",
        filename: "",
      },
      containerTemplate: "",
      containerBackground: "",
    },
  },
  {
    type: "image",
    label_text: "Image",
    column_width: 100,
    props: {
      hidden: false,
      imageData: {
        url: "",
        filename: "",
      },
      height: 100,
      width: 100,
      fullWidth: false,
      style: {},
    },
  },
  {
    type: "slider",
    label_text: "Slider",
    column_width: 100,
    props: {
      hidden: false,
      width: 100,
      slides: [],
      spaceBetweenSlides: 10,
      paginationInside: false,
      slidesPerView: 1,
      delay: "",
      navigation: false,
      loop: false,
    },
  },
  {
    label_text: "Country Field",
    type: "country",
    column_width: 100,
    props: {
      value: "",
      required: false,
      hidden: false,
      placeholder: "",
      name: "",
      width: 100,
      align: "",
      style: {},
      animation: "",
      animation_delay: "",
      floatLabel: false,
      standard: false,
    },
    form: {
      error_message: "",
    },
  },
  {
    label_text: "Checkbox",
    type: "checkbox",
    column_width: 100,
    props: {
      label: "",
      value: "",
      required: false,
      hidden: false,
      name: "",
      align: "",
      width: 100,
      style: {},
      animation: "",
      animation_delay: "",
    },
    form: {
      error_message: "",
    },
  },
  // {
  //   label_text: "Stepper",
  //   type: "stepper",
  //   column_width: 100,
  //   props: {
  //     hidden: false,
  //     align: "",
  //     width: 100,
  //     style: {},
  //     stepContent: [],
  //     containerType: "",
  //     animation: "",
  //     animation_delay: "",
  //   },
  // },
  {
    label_text: "Card Box",
    type: "card_box",
    column_width: 100,
    props: {
      hidden: false,
      align: "",
      width: 100,
      style: {},
      imageData: {
        url: "",
        filename: "",
      },
      cards: [],
      animation: "",
      animation_delay: "",
    },
  },
  {
    label_text: "Icon",
    type: "icon",
    column_width: 100,
    props: {
      hidden: false,
      align: "",
      iconName: "",
      iconSize: 20,
      style: {},
      animation: "",
      animation_delay: "",
    },
  },
];

export const validations = [
  {
    label: "Email",
    value: "Email",
  },
  {
    label: "Phone",
    value: "Phone",
  },
  {
    label: "Password",
    value: "Password",
  },
  {
    label: "Only Letters",
    value: "Only Letters",
  },
  {
    label: "Only Numbers",
    value: "Only Numbers",
  },
  {
    label: "Alphanumeric",
    value: "Alphanumeric",
  },
  {
    label: "Url",
    value: "Url",
  },
  {
    label: "Aadhar Number",
    value: "Aadhar Number",
  },
  {
    label: "PAN Number",
    value: "PAN Number",
  },
  {
    label: "Account Number",
    value: "Account Number",
  },
  {
    label: "Card Number",
    value: "Card Number",
  },
  {
    label: "IFSC",
    value: "IFSC",
  },
  {
    label: "CVV",
    value: "IFSC",
  },
];

export const validationsRegex = {
  Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  Phone: /^[6-9]\d{9}$/,
  Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  "Only Letters": /^[A-Za-z]+$/,
  "Only Numbers": /^\d+$/,
  Alphanumeric: /^[A-Za-z0-9]+$/,
  Url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/\w .-]*)*\/?$/,
  "Aadhar Number": /^\d{4}\s?\d{4}\s?\d{4}$/,
  "PAN Number": /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  "Account Number": /^\d{9,18}$/,
  "Card Number": /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  CVV: /^[0-9]{3,4}$/,
};

export const headingVariantOptions = [
  { label: "H1", value: "H1" },
  { label: "H2", value: "H2" },
  { label: "H3", value: "H3" },
  { label: "H4", value: "H4" },
  { label: "H5", value: "H5" },
  { label: "H6", value: "H6" },
];

export const animationOptions = [
  { label: "Fade", value: "fade" },
  { label: "Fade Up", value: "fade-up" },
  { label: "Fade Down", value: "fade-down" },
  { label: "Fade Left", value: "fade-left" },
  { label: "Fade Right", value: "fade-right" },
  { label: "Fade Up Right", value: "fade-up-right" },
  { label: "Fade Up Left", value: "fade-up-left" },
  { label: "Fade Down Right", value: "fade-down-right" },
  { label: "Fade Down Left", value: "fade-down-left" },
  { label: "Flip Up", value: "flip-up" },
  { label: "Flip Down", value: "flip-down" },
  { label: "Flip Left", value: "flip-left" },
  { label: "Flip Right", value: "flip-right" },
  { label: "Slide Up", value: "slide-up" },
  { label: "Slide Down", value: "slide-down" },
  { label: "Slide Left", value: "slide-left" },
  { label: "Slide Right", value: "slide-right" },
  { label: "Zoom In", value: "zoom-in" },
  { label: "Zoom In Up", value: "zoom-in-up" },
  { label: "Zoom In Down", value: "zoom-in-down" },
  { label: "Zoom In Left", value: "zoom-in-left" },
  { label: "Zoom In Right", value: "zoom-in-right" },
  { label: "Zoom Out", value: "zoom-out" },
  { label: "Zoom Out Up", value: "zoom-out-up" },
  { label: "Zoom Out Down", value: "zoom-out-down" },
  { label: "Zoom Out Left", value: "zoom-out-left" },
  { label: "Zoom Out Right", value: "zoom-out-right" },
];

export const alignmentOptions = [
  { label: "Center", value: "Center" },
  { label: "Right", value: "Right" },
  { label: "Left", value: "Left" },
];

export const sliderPerViewOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
];

export const autoplayDelayOptions = [
  {
    label: "1000",
    value: "1000",
  },
  {
    label: "2000",
    value: "2000",
  },
  {
    label: "3000",
    value: "3000",
  },
  {
    label: "4000",
    value: "4000",
  },
  {
    label: "5000",
    value: "5000",
  },
  {
    label: "6000",
    value: "6000",
  },
];

export const containerOptions = [
  { label: "Shadow Card", value: "Shadow Card" },
  { label: "Border Card", value: "Border Card" },
  { label: "Border Shadow Card", value: "Border Shadow Card" },
  { label: "None", value: "None" },
];

export const animationDelayOptions = [
  { label: "100", value: "100" },
  { label: "200", value: "200" },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
  { label: "700", value: "700" },
  { label: "800", value: "800" },
  { label: "900", value: "900" },
  { label: "1000", value: "1000" },
  { label: "1100", value: "1100" },
  { label: "1200", value: "1200" },
  { label: "1300", value: "1300" },
  { label: "1400", value: "1400" },
  { label: "1500", value: "1500" },
];

export const buttonColorOptions = [
  { label: "primary", value: "primary" },
  { label: "secondary", value: "secondary" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
  { label: "danger", value: "danger" },
  { label: "info", value: "info" },
  { label: "light", value: "light" },
  { label: "dark", value: "dark" },
  { label: "link", value: "link" },
];

export const alignment = {
  Center: "justify-content-center",
  Right: "justify-content-end",
  left: "justify-content-start",
};

export const textAlign = {
  Center: "text-center",
  Right: "text-right",
  Left: "text-left",
};

export const containerClasses = {
  "Shadow Card": "shadow-card",
  "Border Card": "border-card",
  "Border Shadow Card": "border-shadow-card",
};

export const responsiveScreenSizes = [
  { label: "Large Screen", value: "lg" },
  { label: "Medium Screen", value: "md" },
  { label: "Small Screen", value: "sm" },
  { label: "Extra Small Screen", value: "xs" },
];

export function errorMessageFunc(el, value) {
  let field_name =
    el?.props?.label?.slice(0, 1).toUpperCase() +
    el?.props?.label?.slice(1).toLowerCase();
  if (el?.props?.required && !value) {
    return "This field is required";
  } else if (el?.props?.required && value.length == 0) {
    return "This field is required";
  } else if (
    el?.form?.regex &&
    el?.props?.required &&
    !validationsRegex[el?.form?.regex?.value]?.test(value)
  ) {
    return `${field_name} is invalid`;
  } else {
    return "";
  }
}

export const formAction = (currentform, setErrors, errors, onSubmit) => {
  let obj = {};
  let validField = true;
  Object.keys(currentform).map((key) => {
    if (typeof currentform[key] === "string") {
      if (errors[key]?.optional) {
        obj = { ...obj, [key]: { optional: true, message: "" } };
      } else if (currentform[key] == "") {
        obj[key] = "This is field required";
      } else if (!errors[key]?.regex.test(currentform[key])) {
        validField = false;
        obj[key] = errors[key]?.message[1];
      } else {
        validField = true;
      }
    }
  });
  setErrors(obj);

  if (!Object.values(obj).filter((el) => !el?.optional).length && validField) {
    onSubmit(currentform);
  }
};

export const LoginSchema = {
  fields: {
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: {
        regex: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        message: ["This field is required", "Email id is not valid"],
      },
      password: {
        regex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: ["This field is required", "Password is not valid"],
      },
    },
  },
};

export const RegisterSchema = {
  fields: {
    values: {
      full_name: "",
      email: "",
      password: "",
    },
    errors: {
      full_name: {
        regex: /^[A-Za-z ]{3,}$/,
        message: ["This field is required", "First name is not valid"],
      },
      email: {
        regex: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        message: ["This field is required", "Email id is not valid"],
      },
      password: {
        regex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: ["This field is required", "Password is not valid"],
      },
    },
  },
};

export function addPixel(styles, el) {
  let obj = {};
  for (const key in styles) {
    if (key.includes("padding")) {
      obj[key] = `${styles[key]}px`;
    } else {
      obj[key] = styles[key]?.value ? styles[key]?.value : styles[key];
    }
  }
  return obj;
}

function options(el, value, attribute, optionIndex) {
  const values = el?.props?.[attribute]?.map((ele, ind) => {
    if (optionIndex === ind) {
      return {
        ...ele,
        ...(attribute == "options" && { label: value }),
        value: value,
      };
    }
    return ele;
  });
  return values;
}

export function nestedStructure(
  data,
  forms,
  currentElement,
  property,
  properType,
  breakPoint
) {
  const updateForms = forms[breakPoint]?.map((el, i) => {
    const nestedForm = el?.content?.map((ele, id) => {
      if (ele.id === currentElement?.id) {
        return {
          ...ele,
          ...(properType == "addContent"
            ? {
                ...property(ele, data?.type, data?.pageItem, data?.optionValue),
              }
            : {
                ...property(
                  data?.e,
                  ele,
                  data?.attribute,
                  data?.value[data?.type],
                  data?.optionIndex,
                  data?.style
                ),
              }),
        };
      } else {
        return ele;
      }
    });

    if (currentElement?.isContainer) {
      return { ...el, content: nestedForm };
    } else if (el.id === currentElement?.id) {
      return {
        ...el,
        ...(properType == "addContent"
          ? { ...property(el, data?.type, data?.pageItem, data?.optionValue) }
          : {
              ...property(
                data?.e,
                el,
                data?.attribute,
                data?.value[data?.type],
                data?.optionIndex,
                data?.style
              ),
            }),
      };
    } else {
      return el;
    }
  });
  return updateForms;
}

export function addContentProps(el, type, pageItem, optionValue) {
  return {
    props: {
      ...el?.props,
      [type]: [
        ...el?.props?.[type],
        {
          ...(["stepContent", "slides", "cards"].includes(type)
            ? {
                content: pageItem?.page_data,
                url: pageItem?.page_item_url,
                label: pageItem?.page_name,
              }
            : { label: optionValue }),
          value: optionValue,
        },
      ],
    },
  };
}

export function updateforms(e, el, attribute, value, optionIndex, style) {
  return {
    ...el,
    ...(attribute == "column_width" && {
      column_width: Number(e.target.value),
    }),
    ...(attribute == "regex"
      ? {
          form: {
            ...el.form,
            regex: value,
          },
        }
      : {
          props: {
            ...el.props,
            ...(style
              ? {
                  style: {
                    ...el.props.style,
                    [attribute]: value,
                  },
                }
              : {
                  [attribute]: [
                    "options",
                    "stepContent",
                    "slides",
                    "cards",
                  ].includes(attribute)
                    ? options(el, value, attribute, optionIndex)
                    : value,
                }),
          },
        }),
  };
}

export function updateNestedForms(
  forms,
  ele,
  value,
  currentStep = null,
  breakPoint
) {
  const updateForms = forms[breakPoint]?.map((el, i) => {
    const nestedForm = el?.content?.map((eles, id) => {
      if (eles.id === ele.id) {
        return {
          ...eles,
          props: {
            ...eles?.props,
            value: value,
          },
          form: {
            ...eles?.form,
            error_message: errorMessageFunc(eles, value),
          },
        };
      } else {
        return eles;
      }
    });

    const stepContent = el?.props?.stepContent?.map((el, id) => {
      if (id === currentStep) {
        return {
          ...el,
          content: updateNestedForms(el?.content, ele, value),
        };
      }
      return el;
    });

    if (el.type === "stepper" && currentStep !== null) {
      return { ...el, props: { ...el.props, stepContent: stepContent } };
    } else if (ele?.isContainer) {
      return { ...el, content: nestedForm };
    } else if (el.id === ele.id) {
      return {
        ...el,
        props: {
          ...el?.props,
          value: value,
        },
        form: {
          ...el?.form,
          error_message: errorMessageFunc(el, value),
        },
      };
    } else {
      return el;
    }
  });
  return updateForms;
}

export function copyItems(e, ele) {
  e.stopPropagation();
  navigator.clipboard.writeText(
    JSON.stringify(ele.type == "container" ? ele.content : ele)
  );
}

function containerData(json) {
  let data = json?.map((el) => {
    const { id, ...newData } = el;
    return { ...newData, id: generateId(4) };
  });
  return data;
}

export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function pasteItems(e, ele, forms, setForms, breakPoint) {
  e.stopPropagation();
  navigator.clipboard.readText().then((data) => {
    try {
      const json = JSON.parse(data);
      const { id, ...newJsonData } = json;
      const updateData = forms.map((el, i) => {
        if (ele?.id === el?.id && el?.type === "container") {
          return {
            ...el,
            content:
              json.length > 1
                ? [...el?.content, ...containerData(json)]
                : [
                    ...el?.content,
                    { ...newJsonData, id: generateId(4), isContainer: true },
                  ],
          };
        }
        return el;
      });
      setForms({ ...forms, [breakPoint]: updateData });
    } catch (err) {
      setForms({ ...forms, [breakPoint]: [] });
    }
  });
}

export async function parseMultipartRequest(request) {
  const { default: Busboy } = await import("busboy");

  const contentType = request.headers.get("content-type");
  const busboy = Busboy({ headers: { "content-type": contentType } });

  const fields = {};
  const files = [];

  busboy.on("file", (fieldname, stream, info) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => {
      files.push({
        fieldname,
        filename: info.filename,
        mimeType: info.mimeType,
        buffer: Buffer.concat(chunks),
      });
    });
  });

  busboy.on("field", (name, value) => {
    fields[name] = value;
  });

  const nodeStream = Readable.fromWeb(request.body);
  nodeStream.pipe(busboy);

  await new Promise((resolve, reject) => {
    busboy.on("finish", resolve);
    busboy.on("error", reject);
  });

  return { fields, files };
}
