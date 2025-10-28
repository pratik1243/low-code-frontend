"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { formAction, generateId, RegisterSchema } from "../utils/utilFunctions";
import { setLoader } from "../redux/slices/loaderSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import lowCodeImg from "../public/low-code-img.png";
import InputField from "./commonComponents/InputField";

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
      const response = await axios.post(`https://low-code-backend-vyps.vercel.app/api/register`, requestData);
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
          <InputField
            label={"Full Name"}
            name={"full_name"}
            placeholder={"Enter full name"}
            required
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
