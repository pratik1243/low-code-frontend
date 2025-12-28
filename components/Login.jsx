"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoader } from "../redux/slices/loaderSlice";
import { setAuthDetails } from "../redux/slices/authSlice";
import { Button, Col, Row } from "react-bootstrap";
import { formAction, LoginSchema, snackProps } from "../utils/utilFunctions";
import InputField from "./commonComponents/InputField";
import { API_BASE_URL } from "../services/endpoints";
import loginBg from "../public/login-bg-img.png";
import { MdLockOutline } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState(LoginSchema.fields.values);
  const [errors, setErrors] = useState(LoginSchema.fields);

  const loginUser = async (data) => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(`${API_BASE_URL}/login`, data);
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
        toast.success(response?.data?.message, snackProps);        
      } else {
        dispatch(setLoader(false));
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error("Something Went Wrong!", snackProps);
    }
  };

  return (
    <div className="login-sec">
      <Row>
        <Col lg={6} md={6}>
          <div className="logo-sec">
            {" "}
            <Image
              src={loginBg}
              height={550}
              width={550}
              quality={90}
              alt="low-code-img"
            />
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div className="left-panel">
            <div className="inner-left-sec">
              <h3>Log In</h3>
              <InputField
                label={"Email Id"}
                name={"email"}
                placeholder={"Enter email"}
                required
                startIcon={<FiMail size={19} />}
                value={loginDetails?.email}
                setValue={setLoginDetails}
                errorProps={{ errors, setErrors }}
                validationSchema={LoginSchema.fields}
              />
              <InputField
                label={"Password"}
                name={"password"}
                placeholder={"Enter password"}
                required
                passwordBtn
                startIcon={<MdLockOutline size={22} />}
                value={loginDetails?.password}
                setValue={setLoginDetails}
                errorProps={{ errors, setErrors }}
                validationSchema={LoginSchema.fields}
              />
              <div className="text-sec text-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    formAction(
                      loginDetails,
                      setErrors,
                      LoginSchema.fields.errors,
                      (values) => {
                        loginUser(values);
                      }
                    );
                  }}
                >
                  Continue
                </Button>
                <p className="mb-0">
                  Haven't created account yet?{" "}
                  <Link href={"/register"}>Click here</Link>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
