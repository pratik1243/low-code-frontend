import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FormContext } from "../FormCreate";
import { snackProps } from "../../utils/customizeOptions";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { LuLink } from "react-icons/lu";

const PreviewContent = () => {    
  const {
    previewType,
    openPreview,
    setPreviewType,
    setOpenPreview,
    publishedLink,
  } = useContext(FormContext);

  return (
    <Modal
      className="preview-modal-section"
      show={openPreview}
      fullscreen
      onHide={() => {
        setPreviewType("web");
        setOpenPreview(false);
      }}
    >
      <Modal.Header closeButton>
        <div
          className="copy-link"
          onClick={() => {
            navigator.clipboard.writeText(publishedLink);
            toast.success("Published Link Copied", {
              ...snackProps,
              position: "top-right",
              autoClose: 2000,
            });
          }}
        >
          <LuLink /> &nbsp;&nbsp;Published Link
        </div>
        <Modal.Title>
          <div className="preview-tab-sec">
            <button
              className={`btn ${previewType == "web" ? "active" : ""}`}
              onClick={() => setPreviewType("web")}
            >
              <MdOutlineDesktopWindows size={17} /> &nbsp;&nbsp;Web View
            </button>
            <button
              className={`btn ${previewType == "mobile" ? "active" : ""}`}
              onClick={() => setPreviewType("mobile")}
            >
              <FaMobileAlt size={17} /> &nbsp;&nbsp;Mobile View
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <iframe
          src={publishedLink}
          width={previewType == "mobile" ? "400px" : "100%"}
          height="100%"
        />
      </Modal.Body>
    </Modal>
  );
};

export default PreviewContent;
