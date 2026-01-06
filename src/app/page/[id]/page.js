import React from "react";
import dynamic from "next/dynamic";
const FormCreate = dynamic(() => import("../../../../components/FormCreate"));

const FormCreatePage = () => {
  return <FormCreate />;
};

export default FormCreatePage;
