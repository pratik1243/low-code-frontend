"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { formAction, generateId, RegisterSchema, snackProps } from "../utils/utilFunctions";
import { setLoader } from "../redux/slices/loaderSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import loginBg from "../public/login-bg-img.png";
import InputField from "./commonComponents/InputField";
import { API_BASE_URL } from "../services/endpoints";
import { MdLockOutline } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerDetails, setRegisterDetails] = useState(RegisterSchema.fields.values);
  const [errors, setErrors] = useState(RegisterSchema.fields);

  const registerUser = async (data) => {
    try {
      dispatch(setLoader(true));
      const requestData = {
        ...data,
        request_user_id: generateId(10),
      };
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        requestData
      );
      dispatch(setLoader(false));
      if (response.status == 200) {
        router.push("/login");
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
      <Row className="row-sec">
        <Col lg={6} md={6}>
          <div className="left-panel">
            <div className="inner-left-sec">
              <h3>Sign Up</h3>
              <InputField
                label={"Full Name"}
                name={"full_name"}
                placeholder={"Enter full name"}
                required
                startIcon={<FaRegUserCircle size={19} />}
                value={registerDetails?.full_name}
                setValue={setRegisterDetails}
                errorProps={{ errors, setErrors }}
                validationSchema={RegisterSchema.fields}
              />

              <InputField
                label={"Email Id"}
                name={"email"}
                placeholder={"Enter email"}
                required
                value={registerDetails?.email}
                startIcon={<FiMail size={19} />}
                setValue={setRegisterDetails}
                errorProps={{ errors, setErrors }}
                validationSchema={RegisterSchema.fields}
              />

              <InputField
                label={"Password"}
                name={"password"}
                placeholder={"Enter password"}
                required
                passwordBtn
                startIcon={<MdLockOutline size={22} />}
                value={registerDetails?.password}
                setValue={setRegisterDetails}
                errorProps={{ errors, setErrors }}
                validationSchema={RegisterSchema.fields}
              />

              <div className="text-sec text-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    formAction(
                      registerDetails,
                      setErrors,
                      RegisterSchema.fields.errors,
                      (values) => {
                        registerUser(values);
                      }
                    );
                  }}
                >
                  Create Account
                </Button>
                <p className="mb-0">
                  Already registered user?{" "}
                  <Link href={"/login"}>Click here</Link>
                </p>
              </div>
            </div>
          </div>
        </Col>
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
      </Row>
    </div>
  );
};

export default Register;
