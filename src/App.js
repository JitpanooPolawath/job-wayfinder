import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import JobDetails from "./components/jobDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/job-details" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
