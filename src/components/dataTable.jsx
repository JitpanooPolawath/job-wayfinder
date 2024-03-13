import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { JobsData } from "./firebase";
import { useNavigate } from "react-router-dom";

// Initialize Firebase
// Initialize Firebase

const columns = [
  {
    field: "job_title",
    headerName: "Title",
    width: 180,
    valueGetter: (params) => params.row.property.job_title,
  },
  {
    field: "employer_name",
    headerName: "Employer",
    width: 180,
    valueGetter: (params) => params.row.property.employer_name,
  },
  {
    field: "job_apply_link",
    headerName: "Apply link",
    width: 200,
    renderCell: (params) => (
      <a
        href={params.row.property.job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {params.row.property.job_apply_link}
      </a>
    ),
  },
  {
    field: "job_city",
    headerName: "Job city",
    valueGetter: (params) => params.row.property.job_city,
  },
  {
    field: "job_type",
    headerName: "Job type",
    width: 130,
    valueGetter: (params) => params.row.property.job_type,
  },
  {
    field: "job_is_remote",
    headerName: "Remote",
    valueGetter: (params) => params.row.property.job_is_remote,
  },
  {
    field: "job_description",
    headerName: "Click here for more description",
    width: 200,
    valueGetter: (params) => params.row.property.job_description,
  },
  {
    field: "job_offer_expiration_datetime_utc",
    headerName: "Expirationj",
    width: 200,
    valueGetter: (params) =>
      params.row.property.job_offer_expiration_datetime_utc,
  },
  {
    field: "job_posted_at_datetime_utc",
    headerName: "Posted",
    width: 200,
    valueGetter: (params) => params.row.property.job_posted_at_datetime_utc,
  },
];

// Get a list of cities from your database

export default function DataTable({ dataMap }) {
  const navigate = useNavigate();

  const moreData = (params) => {
    const { row, field } = params;
    const selectedJob = row;
    // Do something with the selectedJob

    if (field === "job_description") {
      navigate("/job-details", { state: { selectedJob } });
    }
  };

  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    if (dataMap) {
      setJobList(dataMap);
    } else {
      const fetchData = async () => {
        const data = await JobsData();
        setJobList(data);
      };
      fetchData();
    }
  }, [dataMap]);

  return (
    <>
      <div
        style={{
          padding: 10,
          height: 430,
        }}
      >
        <DataGrid
          onCellClick={moreData}
          rows={jobList}
          columns={columns}
          style={{ color: "#0D3B66", background: "#E7DEB9" }}
        />
      </div>
    </>
  );
}
