import { BsChevronUp } from "react-icons/bs";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { BsChevronDown } from "react-icons/bs";
import DataTable from "./dataTable";

export default function BottomBan({ dataMap }) {
  const [open, setOpen] = useState(false);
  function adjustBottomHeight() {
    const viewportHeight = window.innerHeight;
    const topBannerHeight = viewportHeight * 0.88; // 88% of viewport height
    const bottomHeight = viewportHeight - topBannerHeight;

    const bottomElement = document.querySelector(".bottom");
    bottomElement.style.height = `${bottomHeight + 10}px`;
  }

  window.addEventListener("load", adjustBottomHeight);
  window.addEventListener("resize", adjustBottomHeight);
  const openSlider = () => {
    if (open === false) {
      document.getElementById("bottomBar").style.top = "20%";
      document.getElementById("bottomBar").style.height = "80%";
      document
        .getElementById("bottom-content")
        .querySelector("h6").textContent = "";
      const chevronDownElement = React.createElement(BsChevronDown, {
        size: 35,
      });
      const chevronDownHTML = ReactDOMServer.renderToString(chevronDownElement);
      document.getElementById("bottom-Icon").innerHTML = chevronDownHTML;
      document.querySelector(".dataTable").style.display = "inline";
      setOpen(true);
    } else {
      document.getElementById("bottomBar").style.top = "88%";
      document.getElementById("bottomBar").style.height = "70px";
      document
        .getElementById("bottom-content")
        .querySelector("h6").textContent = "See Posting";
      const chevronUpElement = React.createElement(BsChevronUp, {
        size: 35,
      });
      const chevronUpHTML = ReactDOMServer.renderToString(chevronUpElement);
      document.getElementById("bottom-Icon").innerHTML = chevronUpHTML;
      document.querySelector(".dataTable").style.display = "none";
      adjustBottomHeight();
      setOpen(false);
    }
  };

  return (
    <div id="bottomBar" className="bottom">
      <div id="bottom-content" className="bottom-Obj">
        <div id="bottom-Icon" onClick={openSlider}>
          <BsChevronUp size={35} />
        </div>
        <h6 style={{ userSelect: "none" }}>See posting</h6>
        <div className="dataTable">
          <DataTable dataMap={dataMap} />
        </div>
      </div>
    </div>
  );
}
