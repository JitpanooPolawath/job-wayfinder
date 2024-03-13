import Dropbox from "./dropbox";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { JobsData } from "./firebase";

function Sidebar({ childToParent }) {
  const programLang = [
    "Full Stack",
    "internship",
    "web developer",
    "cybersecurity",
    "Data analyst",
    "project manager",
    "game developer",
  ];
  const jobType = ["Remote"];
  const city = [
    "Vancouver",
    "Surrey",
    "Burnaby",
    "Richmond",
    "Abbotsford",
    "Coquitlam",
    "Kelowna",
    "Delta",
    "Nanaimo",
    "Victoria",
  ];

  const [lang, setLang] = useState([]);
  const [job, setjob] = useState(false);
  const [location, setLocation] = useState([]);

  const childToParentLang = (dataList) => {
    const checkedItems = dataList.filter((item) => item.checked);
    const itemTypes = checkedItems.map((item) => item["item"]);
    setLang(itemTypes);
  };
  const childToParentJob = (dataList) => {
    const checkedItems = dataList.filter((item) => item.checked);
    const itemTypes = checkedItems.map((item) => item["item"]);
    if (itemTypes[0]) {
      setjob(true);
    } else {
      setjob(false);
    }
  };
  const childToParentLocation = (dataList) => {
    const checkedItems = dataList.filter((item) => item.checked);
    const itemTypes = checkedItems.map((item) => item["item"]);

    setLocation(itemTypes);
  };

  const submitData = async () => {
    const data = await JobsData(lang, job, location);
    childToParent(data);
  };
  const submitDataClear = async () => {
    setLang([]);
    setjob(false);
    setLocation([]);
    const data = await JobsData(lang, undefined, location);
    childToParent(data);
  };

  return (
    <>
      <h4 style={{ color: "#FAF0CA" }}>JobWayFinder BC</h4>
      <div className="selector-gap">
        <Dropbox
          selector={"Job Categories"}
          menu={programLang}
          childToParentAll={childToParentLang}
        />
      </div>
      <div className="selector-gap">
        <Dropbox
          selector={"Job Type"}
          menu={jobType}
          childToParentAll={childToParentJob}
        />
      </div>
      <div className="selector-gap">
        <Dropbox
          selector={"City"}
          menu={city}
          childToParentAll={childToParentLocation}
        />
      </div>
      <div className="side-div">
        <Button
          variant="primary"
          className="side-button"
          style={{ background: "#135490", color: "#FAF0CA" }}
          onClick={submitData}
          disabled={lang.length === 0 && location.length === 0}
        >
          Apply
        </Button>
      </div>
      <div className="side-div" style={{ marginTop: "130px" }}>
        <Button
          variant="primary"
          className="side-button"
          style={{ background: "#FAF0CA", color: "#135490" }}
          onClick={submitDataClear}
        >
          select all
        </Button>
      </div>
    </>
  );
}

export default Sidebar;
