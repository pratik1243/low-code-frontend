"use client";
import Select from "react-select";
import { IoAddSharp } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import { LuExternalLink } from "react-icons/lu";
import { addContentProps, nestedStructure } from "../../utils/utilFunctions";
import { useEffect } from "react";

const AddContent = ({
  open,
  handleClose,
  currentField,
  addContentType,
  onCustomizeElement,
}) => {

  const { forms, setForms, currentElement, pagesList } = useContext(FormContext);
  const [optionValue, setOptionValue] = useState("");
  const [pageItem, setPageItem] = useState("");
  const stepList = ["stepper", "slider"];

  const addTextType = {
    stepper: "Add Steps",
    slider: "Add Slides",
    select: "Add Options",
  };

  const orderContent = (e, dropIndex, i) => {
    const filterContentList = forms[i].props[addContentType];
    const dragIndex = JSON.parse(e?.dataTransfer?.getData("element"));
    const draggedItem = filterContentList[dragIndex];
    filterContentList?.splice(dragIndex, 1);
    filterContentList?.splice(dropIndex, 0, draggedItem);
    return filterContentList;
  };

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    const updateForms = forms?.map((el, i) => {
      if (["stepper", "slider", "select"].includes(el.type) && el.id === currentElement.id) {
        return {
          ...el,
          props: {
            ...el.props,
            [addContentType]: orderContent(e, dropIndex, i),
          },
        };
      }
      return el;
    });
    setForms(updateForms);
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
      optionValue: optionValue
    };
    setForms(nestedStructure(addContentObj, forms, currentElement, addContentProps, "addContent"));
    setOptionValue("");
    setPageItem("");
  };

  const removeOption = (value, type) => {
    const updateForms = forms?.map((el, i) => {
      if (el.id === currentElement?.id) {
        return {
          ...el,
          props: {
            ...el.props,
            [type]: el?.props?.[type]?.filter((el) => el?.value !== value),
          },
        };
      }
      return el;
    });
    setForms(updateForms);
  };

  return (
    <Modal
      show={open}
      fullscreen={currentField?.type !== "select"}
      onHide={handleClose}
      size={currentField?.type == "select" ? "lg" : "xl"}
      className="modal-dialog-customize"
    >
      <Modal.Header closeButton>
        <Modal.Title>{addTextType[currentField?.type]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="customize-prop-sec p-2">
          <div className="d-flex mt-2 mb-4">
            <div className="w-100">
              {stepList.includes(currentField?.type) && (
                <label className="mb-1">Stepper Label</label>
              )}
              <input
                type="text"
                placeholder={`Enter ${
                  currentField?.type == "stepper" ? "step" : "option"
                } value`}
                className="customize-input"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
              />
            </div>
            {stepList.includes(currentField?.type) && (
              <div className="w-100 ml-3">
                <label className="mb-1">Page Item</label>
                <Select
                  isClearable
                  placeholder={"Select page item"}
                  options={pagesList}
                  getOptionLabel={(e) => e.page_name}
                  getOptionValue={(e) => e.page_data}
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
                  <th>
                    <div className="mx-2 my-1">
                      {currentField?.type == "stepper"
                        ? "Step"
                        : currentField?.type == "slider"
                        ? "Slide"
                        : "Option"}{" "}
                      Label
                    </div>
                  </th>
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
                          onClick={() =>
                            removeOption(ele?.value, addContentType)
                          }
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AddContent;
