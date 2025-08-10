
import { Readable } from 'stream';

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
      align: "",
      width: 100,
      style: {},
      animation: "",
      animation_delay: "",
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
      multiple: false,
      options: [],
      width: 100,
      align: "",
      style: {},
      animation: "",
      animation_delay: "",
    },
    form: {
      regex: "",
      validation_type: "",
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
      color: "",
      variant: "standard",
      hidden: false,
      hover_color: "",
      align: "",
      redirectUrl: "",
      width: 100,
      style: {},
      animation: "",
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
    },
  },
  {
    type: "image",
    label_text: "Image",
    column_width: 100,
    props: {
      hidden: false,
      url: "",
      height: 0,
      width: 0,
      style: {},
    },
  },
  {
    type: "slider",
    label_text: "Slider",
    column_width: 100,
    slides: ["slide 1", "slide 2", "slide 3", "slide 4"],
    props: {
      hidden: false,
      width: 100,
      spaceBetweenSlides: 10,
      slidesPerView: 1,
      delay: "",
      navigation: false,
      loop: false,
    },
  },
];

export const validations = [
  {
    label: "Email",
    value: "^[^s@]+@[^s@]+.[^s@]+$",
  },
  {
    label: "Phone",
    value: "^+?[1-9]d{9,14}$",
  },
  {
    label: "Password",
    value: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*?&]{8,}$",
  },
  {
    label: "Only Letters",
    value: "^[A-Za-z]+$",
  },
  {
    label: "Only Numbers",
    value: "^d+$",
  },
  {
    label: "Alphanumeric",
    value: "^[A-Za-z0-9]+$",
  },
  {
    label: "Url",
    value: "^(https?://)?([w-]+(.[w-]+)+)([/w .-]*)*/?$",
  },
  {
    label: "Aadhar Number",
    value: "^d{4}s?d{4}s?d{4}$",
  },
  {
    label: "PAN Number",
    value: "^[A-Z]{5}[0-9]{4}[A-Z]$",
  },
  {
    label: "Account Number",
    value: "^d{9,18}$",
  },
  {
    label: "Card Number",
    value: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$",
  },
  {
    label: "IFSC",
    value: "^[A-Z]{4}0[A-Z0-9]{6}$",
  },
  {
    label: "CVV",
    value: "^[0-9]{3,4}$",
  },
];

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

export const errorMessageFunc = (el, value) => {
  const storedRegex = new RegExp(el?.form?.regex?.value);
  if (el?.props?.required && !value) {
    return "This field is required";
  } else if (el?.props?.required && value.length == 0) {
    return "This field is required";
  } else if (
    storedRegex &&
    el?.props?.required &&
    !storedRegex?.test(value) &&
    value
  ) {
    return "This field is invalid";
  } else {
    return "";
  }
};

export const setElementWidth = (ele) => {
  return {
    ...(ele?.props?.width && {
      maxWidth: `${ele?.props?.width}%`,
    }),
  };
};

export const addPixel = (styles) => {
  let obj = {};
  for (const key in styles) {
    if (key.includes("padding")) {
      obj[key] = `${styles[key]}px`;
    } else {
      obj[key] = styles[key]?.value ? styles[key]?.value : styles[key];
    }
  }
  return obj;
};

export async function parseMultipartRequest(request) {
  const { default: Busboy } = await import('busboy');

  const contentType = request.headers.get("content-type");
  const busboy = Busboy({ headers: { 'content-type': contentType } });

  const fields = {};
  const files = [];

  busboy.on("file", (fieldname, stream, info) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
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
