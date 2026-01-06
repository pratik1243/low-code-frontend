import React from 'react'
import dynamic from "next/dynamic";
const WebPage = dynamic(() => import("../../../../components/WebPage"));

const PageRender = () => {
  return (
    <WebPage />
  )
}

export default PageRender