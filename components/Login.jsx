"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoader } from "../redux/slices/loaderSlice";
import { setAuthDetails } from "../redux/slices/authSlice";
import { setSnackbarProps } from "../redux/slices/snackbarSlice";
import { Button, Col, Row } from "react-bootstrap";
import lowCodeImg from "../public/low-code-img.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async () => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(
        `http://localhost:8000/login`,
        formData
      );
      dispatch(setLoader(false));
      if (response.status == 200) {
        router.push("/page-list");
        dispatch(
          setAuthDetails({
            token: response?.data?.responseData?.token,
            request_user_id: response?.data?.responseData?.request_user_id,
            user_name: response?.data?.responseData?.user_name,
          })
        );
        dispatch(
          setSnackbarProps({
            variant: "Success",
            message: response?.data?.message,
            open: true,
          })
        );
      } else {
        dispatch(setLoader(false));
        dispatch(
          setSnackbarProps({
            variant: "Danger",
            message: response?.data?.message,
            open: true,
          })
        );
      }
    } catch (error) {
      dispatch(setLoader(false));
      dispatch(
        setSnackbarProps({
          variant: "Danger",
          message: "Something Went Wrong!",
          open: true,
        })
      );
    }
  };

  return (
    <div className="login-sec">
      <Row>
        <Col lg={6} md={6}>
          <h3>Log In</h3>
          <div className="input-field float-label">
            <label>Email Id</label>
            <input
              type="text"
              name="email"
              required
              value={formData?.email}
              placeholder="Enter email"
              onChange={(e) => formChange(e)}
            />
            <span className="error-message"></span>
          </div>
          <div className="input-field float-label">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              required
              value={formData?.password}
              onChange={(e) => formChange(e)}
            />
            <div role="button" className="password-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span className="error-message"></span>
          </div>
          <div className="text-sec text-center">
            <Button variant="primary" onClick={loginUser}>
              Login
            </Button>
            <p className="mb-0">
              Not registered yet?{" "}
              <Link href={"/register"}>Create an Account</Link>
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

export default Login;
