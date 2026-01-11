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
      countryCode: false,
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
      external_link: "",
      isLink: false,
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
      gradientColor: ""
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
      checked: false,
      checkBoxColor: "",
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
  {
    label_text: "Radio Group",
    type: "radio",
    column_width: 100,
    props: {
      value: "",
      title: "",
      required: false,
      hidden: false,
      name: "",
      radio_options: [],
      width: 100,
      align: "",
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

export const snackProps = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
};

export const menuTemplateList = [
  {
    label: "Template 1",
    value: "Template 1",
  },
  {
    label: "Template 2",
    value: "Template 2",
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

export const countryCallingCodes = {
  AF: 93,
  AL: 355,
  DZ: 213,
  AS: 1,
  AD: 376,
  AO: 244,
  AI: 1,
  AQ: 672,
  AG: 1,
  AR: 54,
  AM: 374,
  AW: 297,
  AU: 61,
  AT: 43,
  AZ: 994,
  BS: 1,
  BH: 973,
  BD: 880,
  BB: 1,
  BY: 375,
  BE: 32,
  BZ: 501,
  BJ: 229,
  BM: 1,
  BT: 975,
  BO: 591,
  BA: 387,
  BW: 267,
  BR: 55,
  IO: 246,
  BN: 673,
  BG: 359,
  BF: 226,
  BI: 257,
  KH: 855,
  CM: 237,
  CA: 1,
  CV: 238,
  KY: 1,
  CF: 236,
  TD: 235,
  CL: 56,
  CN: 86,
  CX: 61,
  CC: 61,
  CO: 57,
  KM: 269,
  CG: 242,
  CD: 243,
  CK: 682,
  CR: 506,
  CI: 225,
  HR: 385,
  CU: 53,
  CY: 357,
  CZ: 420,
  DK: 45,
  DJ: 253,
  DM: 1,
  DO: 1,
  EC: 593,
  EG: 20,
  SV: 503,
  GQ: 240,
  ER: 291,
  EE: 372,
  SZ: 268,
  ET: 251,
  FK: 500,
  FO: 298,
  FJ: 679,
  FI: 358,
  FR: 33,
  GF: 594,
  PF: 689,
  GA: 241,
  GM: 220,
  GE: 995,
  DE: 49,
  GH: 233,
  GI: 350,
  GR: 30,
  GL: 299,
  GD: 1,
  GP: 590,
  GU: 1,
  GT: 502,
  GG: 44,
  GN: 224,
  GW: 245,
  GY: 592,
  HT: 509,
  HN: 504,
  HK: 852,
  HU: 36,
  IS: 354,
  IN: 91,
  ID: 62,
  IR: 98,
  IQ: 964,
  IE: 353,
  IM: 44,
  IL: 972,
  IT: 39,
  JM: 1,
  JP: 81,
  JE: 44,
  JO: 962,
  KZ: 7,
  KE: 254,
  KI: 686,
  KP: 850,
  KR: 82,
  KW: 965,
  KG: 996,
  LA: 856,
  LV: 371,
  LB: 961,
  LS: 266,
  LR: 231,
  LY: 218,
  LI: 423,
  LT: 370,
  LU: 352,
  MO: 853,
  MG: 261,
  MW: 265,
  MY: 60,
  MV: 960,
  ML: 223,
  MT: 356,
  MH: 692,
  MQ: 596,
  MR: 222,
  MU: 230,
  YT: 262,
  MX: 52,
  FM: 691,
  MD: 373,
  MC: 377,
  MN: 976,
  ME: 382,
  MS: 1,
  MA: 212,
  MZ: 258,
  MM: 95,
  NA: 264,
  NR: 674,
  NP: 977,
  NL: 31,
  NC: 687,
  NZ: 64,
  NI: 505,
  NE: 227,
  NG: 234,
  NU: 683,
  NF: 672,
  MK: 389,
  MP: 1,
  NO: 47,
  OM: 968,
  PK: 92,
  PW: 680,
  PA: 507,
  PG: 675,
  PY: 595,
  PE: 51,
  PH: 63,
  PL: 48,
  PT: 351,
  PR: 1,
  QA: 974,
  RO: 40,
  RU: 7,
  RW: 250,
  RE: 262,
  BL: 590,
  SH: 290,
  KN: 1,
  LC: 1,
  MF: 590,
  PM: 508,
  VC: 1,
  WS: 685,
  SM: 378,
  ST: 239,
  SA: 966,
  SN: 221,
  RS: 381,
  SC: 248,
  SL: 232,
  SG: 65,
  SK: 421,
  SI: 386,
  SB: 677,
  SO: 252,
  ZA: 27,
  ES: 34,
  LK: 94,
  SD: 249,
  SR: 597,
  SE: 46,
  CH: 41,
  SY: 963,
  TW: 886,
  TJ: 992,
  TZ: 255,
  TH: 66,
  TL: 670,
  TG: 228,
  TO: 676,
  TT: 1,
  TN: 216,
  TR: 90,
  TM: 993,
  TC: 1,
  TV: 688,
  UG: 256,
  UA: 380,
  AE: 971,
  GB: 44,
  US: 1,
  UY: 598,
  UZ: 998,
  VU: 678,
  VA: 379,
  VE: 58,
  VN: 84,
  VG: 1,
  VI: 1,
  YE: 967,
  ZM: 260,
  ZW: 263,
};

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

export const menuAnimationOptions = [
  { label: "Fade", value: "fade" },
  { label: "Fade Up", value: "fade-up" },
  { label: "Zoom In", value: "zoom-in" },
  { label: "Collapse", value: "Collapse" },
];

export const fontWeightOptions = [
  { label: "100", value: "100" },
  { label: "200", value: "200" },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
  { label: "700", value: "700" },
];

export const fieldVariantOptions = [
  { label: "Float Label", value: "Outlined" },
  { label: "Standard", value: "Standard" },
  { label: "Default", value: "Default" },
];

export const scrollAnimationOtions = [
  { label: "Once", value: "Once" },
  { label: "Every Time", value: "Every Time" },
  { label: "None", value: "None" },
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
  { label: "Desktop", value: "lg" },
  { label: "Laptop", value: "md" },
  { label: "Tablet", value: "sm" },
  { label: "Mobile", value: "xs" },
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
    if (key.includes("padding") || key.includes("fontSize")) {
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
                content: pageItem?.page_data?.lg,
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

export const addContentOptions = [
  "options",
  "stepContent",
  "slides",
  "cards",
  "radio_options",
];

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
                  [attribute]: addContentOptions.includes(attribute)
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
            ...(typeof value == "boolean"
              ? { checked: value }
              : { value: value }),
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
          ...(typeof value == "boolean"
            ? { checked: value }
            : { value: value }),
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
      const updateData = forms[breakPoint]?.map((el, i) => {
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
