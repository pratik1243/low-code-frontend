import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPageCreateDetails } from "../redux/slices/pageCreateSlice";
import { generateId } from "../utils/customizePropFunctions";

const AddPageSec = ({ formData, setFormData, show, setShow }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const onPageCreate = () => {
    const data = { ...formData, page_id: `${generateId(4)}` };
    dispatch(setPageCreateDetails(data));
    router.push("/page/create");
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    if (name == "page_item") {
      setFormData({
        ...formData,
        page_item: e.target.checked,
        page_link: "",
        base_page_link: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          Create Page {formData.page_item && "Item"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="page-create-sec">
          <div>
            <label>
              Page Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="page_name"
              placeholder="Enter page name"
              onChange={(e) => formChange(e)}
            />
          </div>
          {!formData.page_item && (
            <>
              <div className="mt-4">
                <label>
                  Base Page Route <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="base_page_link"
                  placeholder="Enter base route"
                  onChange={(e) => formChange(e)}
                />
              </div>
              <div className="mt-4">
                <label>
                  Page Route <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="page_link"
                  placeholder="Enter page route"
                  onChange={(e) => formChange(e)}
                />
              </div>
            </>
          )}

          <div className="mt-4">
            <div className="d-flex check-box">
              <input
                type="checkbox"
                id="is-page-item"
                name="page_item"
                onChange={(e) => formChange(e)}
              />
              <label htmlFor="is-page-item" className="mb-0">
                Create as page item
              </label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary page-cancel-btn"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {formData.page_item ? (
          <Button
            variant="primary"
            className="page-create-btn"
            onClick={onPageCreate}
            disabled={!formData.page_name}
          >
            Create Page Item
          </Button>
        ) : (
          <Button
            variant="primary"
            className="page-create-btn"
            disabled={
              formData.page_name &&
              (formData.base_page_link || formData.page_link)
                ? false
                : true
            }
            onClick={onPageCreate}
          >
            Create Page
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddPageSec;
