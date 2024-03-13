import Form from "react-bootstrap/Form";
import React from "react";

function Radio({ text, keyID, childToParent }) {
  const selectCheck = () => {
    childToParent();
  };
  return (
    <Form onChange={selectCheck}>
      {["checkbox"].map((type) => (
        <div key={`default-${type}`} className="radioForm">
          <Form.Check // prettier-ignore
            type={type}
            id={keyID}
            label={`${text}`}
          />
        </div>
      ))}
    </Form>
  );
}

export default Radio;
