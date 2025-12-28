"use client";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/slices/loaderSlice";
import { commonPostApiFunction } from "../services/commonApiFunc";

const CreateDB = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    database_name: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const createDatabase = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        key: "bdgerty",
        payload: {
          collectionName: formData.database_name,
        },
      };
      const response = await commonPostApiFunction(requestData);
      dispatch(setLoader(false));
      if (response.status == 200) {
        setShow(false);
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  return (
    <div>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add Database
        </Button>
      </div>
      <div></div>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Create Database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="page-create-sec">
            <div>
              <label>Database Name <span className="color-red">*</span></label>
              <input
                type="text"
                name="database_name"
                onChange={(e) => formChange(e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createDatabase}>
            Create Database
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateDB;
