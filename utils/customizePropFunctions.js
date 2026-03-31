import { validationsRegex } from "./customizeOptions";

export function generateId(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function emailStyles(data) {
  const { text, url, imageUrl, ...styles } = data;
  return styles;
}

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

export function addPixel(styles, el) {
  let obj = {};
  for (const key in styles) {
    if (
      key.includes("padding") ||
      key.includes("fontSize") ||
      key.includes("borderRadius")
    ) {
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
  navigator.clipboard.writeText(JSON.stringify(ele));
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
      const jsonObj = { ...newJsonData, id: generateId(4), isContainer: true };
      const updateData = forms[breakPoint]?.map((el, i) => {
        if (ele?.id === el?.id && el?.type === "container") {
          return {
            ...el,
            content:
              newJsonData.type == "container"
                ? [...el?.content, ...containerData(newJsonData?.content)]
                : newJsonData.length > 1
                ? [...el?.content, ...containerData(newJsonData)]
                : [...el?.content, jsonObj],
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
