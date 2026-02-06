import React from 'react'
import nextDynamic from "next/dynamic";
export const dynamic = "force-dynamic";
const WebPage = nextDynamic(() => import("../../../../components/WebPage"));

const PageRender = () => {
  return <WebPage />;
}

export default PageRender;
