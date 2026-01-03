import React from "react";
import IconComponent from "./IconComponent";

function IconGrid({ filteredIcons, setIconType }) {
  return (
    <>
      {filteredIcons?.map((ele, i) => {
        return (
          <div key={i} className="icon-sec" onClick={() => setIconType(ele)}>
            <IconComponent icon={ele} />
            <span className="icon-text">{ele?.slice(2)}</span>
          </div>
        );
      })}
    </>
  );
}

export default React.memo(IconGrid);
