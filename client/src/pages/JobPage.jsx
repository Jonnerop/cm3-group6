import React, { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

function JobPage(id) {
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setJob(...data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  return (
    <div className="border border-red-500">
      <JobListing {...job} />
      <div className="flex">
        <button>Apply</button>
        <button>Edit Job</button>
        <button>Delete Job</button>
      </div>
    </div>
  );
}

export default JobPage;
