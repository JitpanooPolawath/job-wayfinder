import { BsJustify } from "react-icons/bs";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import BottomBan from "./bottomBan";
import TestMap from "./testMap";

function Home() {
  const [openLeft, setOpenLeft] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [inputValue, setInputValue] = useState("");
  const [, setSubmittedValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        setSubmittedValue(trimmedValue);
        setInputValue("");
      }
    }
  };

  function clickSide() {
    if (openLeft === false) {
      document.getElementById("sidebar").style.left = "0";
      setOpenLeft(true);
    } else {
      document.getElementById("sidebar").style.left = "-250px";
      setOpenLeft(false);
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (document.getElementById("sidebar")) {
      if (windowWidth > 1000) {
        document.getElementById("sidebar").style.left = "0";
        setOpenLeft(true);
      } else {
        document.getElementById("sidebar").style.left = "-250px";
        setOpenLeft(false);
      }
    }
  }, [windowWidth]);

  const [data, setData] = useState();
  const childToParent = (dataList) => {
    setData(dataList);
  };
  return (
    <>
      <div>
        <nav
          className="p-4 navbar navbar-expand-lg justify-content-center"
          style={{ background: "#0D3B66" }}
        >
          <div className="expand-btn">
            <button
              type="button"
              class="btn"
              style={{ color: "#FAF0CA" }}
              onClick={clickSide}
            >
              <BsJustify size={40} />
            </button>
          </div>
          <input
            type="email"
            className="form-control form-control-l w-50 mx-auto "
            id="searchJob"
            style={{ background: "#FAF0CA" }}
            placeholder="Search for Job"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></input>
          <button
            className="btn"
            type="button"
            style={{ background: "#135490", color: "#FAF0CA" }}
          >
            About Us
          </button>
        </nav>
      </div>
      <div id="sidebar" className="sidebar">
        <Sidebar childToParent={childToParent} />
      </div>
      <div className="Map">
        <div className="leaf-map">
          <TestMap dataMap={data} />
        </div>
        <BottomBan dataMap={data} />
      </div>
    </>
  );
}

export default Home;
