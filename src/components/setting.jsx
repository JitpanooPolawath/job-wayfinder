import { useState, useEffect } from "react";

const Setting = ({ lang, job, location }) => {
  // Now you can use React Hooks here since Setting is a React functional component
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    // Here you can perform any side effects or computations based on lang, job, and location
    const computedSetting = {
      // Compute the setting based on lang, job, and location
    };
    setSetting(computedSetting);
  }, [lang, job, location]);

  return setting;
};

export default Setting;
