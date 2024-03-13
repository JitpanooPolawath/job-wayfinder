import { useLocation } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const { selectedJob } = location.state || {};

  return (
    <div>
      <>
        <h1 style={{ padding: 20 }}>{selectedJob.property.job_title}</h1>
        <div style={{ margin: 30 }}>
          <h4 style={{ paddingLeft: 50 }}>
            {selectedJob.property.employer_name} ----{" "}
            {selectedJob.property.job_city}, BC
          </h4>
          <p style={{ padding: 50 }}>{selectedJob.property.job_description}</p>
        </div>
      </>
    </div>
  );
};

export default JobDetails;
