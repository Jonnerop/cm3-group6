import React from "react";
import JobListing from "./JobListing";

function jobListings({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <div className="flex flex-col border rounded-sm bg-[#E0E0E0] p-2 m-4 text-center items-center">
          <h2 className="text-[#29B6F6] text-xl font-semibold">{job.title}</h2>
          <p>{job.type}</p>
          <p>{job.company.name}</p>
          <p>{job.salary}</p>
          <button>View Job</button>
        </div>
      ))}
    </div>
  );
}

export default jobListings;
