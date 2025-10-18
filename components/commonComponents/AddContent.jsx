"use client";
import Select from "react-select";
import { IoAddSharp } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import { LuExternalLink } from "react-icons/lu";
import { addContentProps, nestedStructure } from "../../utils/utilFunctions";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const AddContent = ({
  currentField,
  addContentType,
  onCustomizeElement,
  goBack,
}) => {
  const { forms, setForms, currentElement, pagesList, breakPoint } = useContext(FormContext);
  const [optionValue, setOptionValue] = useState("");
  const [pageItem, setPageItem] = useState("");
  const stepList = ["stepper", "slider", "card_box"];
  const stepList2 = ["stepper", "slider", "select", "card_box"];

  const orderContent = (e, dropIndex, i, id = undefined) => {
    const filterContentList = id !== undefined ? forms[breakPoint][id]?.content[i]?.props[addContentType] : forms[breakPoint][i]?.props[addContentType];
    const dragIndex = JSON.parse(e?.dataTransfer?.getData("element"));
    const draggedItem = filterContentList[dragIndex];
    filterContentList?.splice(dragIndex, 1);
    filterContentList?.splice(dropIndex, 0, draggedItem);
    return filterContentList;
  };

  const contentLabel = {
    slider: "Slide",
    stepper: "Stepper",
    card_box: "Card",
    select: "Option",
  };

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    const updateForms = forms[breakPoint]?.map((el, i) => {
      const updateNestedForms = el?.content?.map((ele, id) => {
        if (stepList2.includes(ele.type) && ele.id === currentElement.id) {
          return {
            ...ele,
            props: {
              ...ele?.props,
              [addContentType]: orderContent(e, dropIndex, id, i),
            },
          };
        }
        return ele;
      });
      if (currentElement?.isContainer) {
        return { ...el, content: updateNestedForms };
      } else if (stepList2.includes(el.type) && el.id === currentElement.id) {
        return {
          ...el,
          props: {
            ...el?.props,
            [addContentType]: orderContent(e, dropIndex, i),
          },
        };
      }
      return el;
    });
    // setForms(updateForms);
    setForms({ ...forms, [breakPoint]: updateForms });
  };

  const onDragStart = (e, i) => {
    e.dataTransfer.setData("element", i);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const addSelectOptions = (type) => {
    const addContentObj = {
      type: type,
      pageItem: pageItem,
      optionValue: optionValue,
    };
    setForms({
      ...forms,
      [breakPoint]: nestedStructure(
        addContentObj,
        forms,
        currentElement,
        addContentProps,
        "addContent",
        breakPoint
      ),
    });
    setOptionValue("");
    setPageItem("");
  };

  const removeOption = (label, type) => {
    const updateForms = forms[breakPoint]?.map((el, i) => {
      const updateNestedForms = el?.content?.map((ele, id) => {
        if (ele.id === currentElement.id) {
          return {
            ...ele,
            props: {
              ...ele.props,
              [type]: ele?.props?.[type]?.filter((e) => e?.label !== label),
            },
          };
        }
        return ele;
      });
      if (currentElement?.isContainer) {
        return { ...el, content: updateNestedForms };
      } else if (el.id === currentElement?.id) {
        return {
          ...el,
          props: {
            ...el.props,
            [type]: el?.props?.[type]?.filter((el) => el?.label !== label),
          },
        };
      }
      return el;
    });
    // setForms(updateForms);
    setForms({ ...forms, [breakPoint]: updateForms });
  };

  return (
    <div className="customize-prop-sec p-4 modal-dialog-customize">
      <Button
        variant={"primary"}
        className="go-back-btn"
        onClick={() => {
          goBack();
        }}
      >
        <IoMdArrowBack />
        &nbsp;&nbsp;Go Back
      </Button>
      <div className="d-flex mt-4 mb-4">
        {!["card_box", "slider"].includes(currentField?.type) && (
          <div className="w-100">
            {stepList.includes(currentField?.type) && (
              <label className="mb-1">
                {contentLabel[currentField?.type]} Label
              </label>
            )}
            <input
              type="text"
              placeholder={`Enter value`}
              className="customize-input"
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
            />
          </div>
        )}
        {stepList.includes(currentField?.type) && (
          <div
            className={`w-100 ${
              ["card_box", "slider"].includes(currentField?.type) ? "" : "ml-3"
            }`}
          >
            <label className="mb-1">Page Item</label>
            <Select
              isClearable
              placeholder={"Select page item"}
              options={pagesList}
              getOptionLabel={(e) => e.page_name}
              getOptionValue={(e) => e.page_data[breakPoint]}
              value={pageItem || ""}
              onChange={(e) => setPageItem(e)}
            />
          </div>
        )}
        <button
          disabled={!optionValue && !pageItem}
          className={`${
            stepList.includes(currentField?.type) ? "stepper-mt" : ""
          } add-option`}
          onClick={() => addSelectOptions(addContentType)}
        >
          <IoAddSharp />
        </button>
      </div>
      <div className="customize-content-table">
        <Table bordered>
          <thead>
            <tr>
              {!["card_box", "slider"].includes(currentField?.type) && (
                <th>
                  <div className="mx-2 my-1">
                    {contentLabel[currentField?.type]} Label
                  </div>
                </th>
              )}
              {stepList.includes(currentField?.type) && (
                <th>
                  <div className="mx-2 my-1">Page Item</div>
                </th>
              )}
              <th>
                <div className="mx-2 my-1">Action</div>
              </th>
            </tr>
          </thead>
          <tbody className="customize-option-sec mt-4">
            {currentField?.props?.[addContentType]?.map((ele, i) => {
              return (
                <tr
                  key={i}
                  draggable
                  onDragOver={(e) => onDragOver(e)}
                  onDragStart={(e) => onDragStart(e, i)}
                  onDrop={(e) => onDropItem(e, i)}
                >
                  {!["card_box", "slider"].includes(currentField?.type) && (
                    <td>
                      <div className="option-input m-2">
                        <input
                          type="text"
                          value={ele?.value}
                          onChange={(e) =>
                            onCustomizeElement(
                              e,
                              addContentType,
                              "input",
                              forms,
                              "",
                              i
                            )
                          }
                        />
                      </div>
                    </td>
                  )}
                  {stepList.includes(currentField?.type) && (
                    <td>
                      <div className="d-flex align-items-center m-2 mt-3">
                        <LuExternalLink className="redirect-page" />{" "}
                        <a
                          href={ele?.url}
                          target="_blank"
                          className="page-item-link"
                        >
                          {ele?.label}
                        </a>
                      </div>
                    </td>
                  )}
                  <td className="text-center">
                    <Button
                      variant="danger delete-content-btn"
                      className="m-2"
                      onClick={() => removeOption(ele?.label, addContentType)}
                    >
                      <MdDeleteOutline size={19} /> &nbsp;Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddContent;
