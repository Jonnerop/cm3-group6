import React from "react";
import JobListing from "./JobListing";

function jobListings({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <div className="flex flex-wrap border rounded-sm">
          <h2>{job.title}</h2>
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
