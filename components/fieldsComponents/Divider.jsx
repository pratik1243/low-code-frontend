import React from 'react'

const Divider = ({ ele, path }) => {
  return (
    <div>{path.includes("web-page") ? <hr/> : "Divider"}</div>
  )
}

export default Divider