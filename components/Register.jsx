"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { generateId } from "../utils/utilFunctions";
import { setLoader } from "../redux/slices/loaderSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import lowCodeImg from "../public/low-code-img.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async () => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        ...formData,
        request_user_id: generateId(10),
      };
      const response = await axios.post(`http://localhost:8000/register`, requestData);
      dispatch(setLoader(false));
      if (response.status == 200) {
        router.push("/login");
      } else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="login-sec register">
      <Row className="row-sec">
        <Col lg={6} md={6}>
          <h3>Create Account</h3>
          <Row className="align-items-center">
            <Col lg={6} md={6}>
              <div className="input-field mb-3 float-label">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData?.first_name}
                  placeholder="Enter first name"
                  onChange={(e) => formChange(e)}
                  required
                />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="input-field mb-3 float-label">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData?.last_name}
                  placeholder="Enter last name"
                  onChange={(e) => formChange(e)}
                  required
                />
              </div>
            </Col>
          </Row>
          <div className="input-field float-label">
            <label>Email Id</label>
            <input
              type="text"
              name="email"
              value={formData?.email}
              placeholder="Enter email"
              onChange={(e) => formChange(e)}
              required
            />
          </div>
          <div className="input-field float-label">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData?.password}
              placeholder="Enter password"
              onChange={(e) => formChange(e)}
              required
            />
             <div role="button" className="password-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="text-sec text-center">
            <Button variant="primary" onClick={registerUser}>
              Sign Up
            </Button>
            <p className="mb-0">
              Already registered an account? <Link href={"/login"}>Login</Link>
            </p>
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div className="logo-sec">
            {" "}
            <Image
              src={lowCodeImg}
              height={190}
              width={270}
              alt="low-code-img"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
