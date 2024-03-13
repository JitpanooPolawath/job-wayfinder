import Dropdown from "react-bootstrap/Dropdown";
import Radio from "./radio";
import { useState } from "react";

export default function Dropbox({ selector, menu, childToParentAll }) {
  const [checkedData] = useState([]);
  const childToParent = () => {
    for (let i = 0; i < menu.length; i++) {
      const keyID = `${i}-${selector}`;
      const checked = document.getElementById(keyID).checked;
      const item = menu[i];
      const tempdata = { checked, item, keyID };
      checkedData[i] = tempdata;
    }
    childToParentAll(checkedData);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="dark"
          id="dropdown-basic"
          style={{ background: "#FAF0CA", color: "#135490", width: 200 }}
        >
          {selector}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ background: "#FAF0CA", color: "#135490" }}>
          {menu.map((item, index) => (
            <Radio
              key={index}
              text={item}
              keyID={`${index}-${selector}`}
              childToParent={childToParent}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
