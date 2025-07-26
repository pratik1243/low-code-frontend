import React from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";

const ButtonComp = ({ ele }) => {
  const router = useRouter();

  const events = () => {
    if (ele?.props?.redirectUrl?.value) {
      router.push(ele?.props?.redirectUrl?.value);
    }
  };
  return (
    <Button variant={`${ele?.props?.color?.value || "primary"}`} onClick={events} className="w-100">
      {ele?.props?.text || "Button"}
    </Button>
  );
};

export default ButtonComp;
