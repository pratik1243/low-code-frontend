import React from 'react'
import dynamic from "next/dynamic";
const PageList = dynamic(() => import("../../../components/PageList"));

const PageListComp = () => {
  return (
    <PageList />
  )
}

export default PageListComp