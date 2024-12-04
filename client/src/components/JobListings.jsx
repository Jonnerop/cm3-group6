import React from "react";
import JobListing from "./JobListing";
import { Link } from "react-router-dom";

function jobListings({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <div
          key={job._id}
          className="flex flex-col border rounded-sm bg-[#E0E0E0] p-2 m-4"
        >
          <h2 className="m-auto text-[#29B6F6] text-xl font-semibold">
            {job.title}
          </h2>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <p>Salary: {job.salary}</p>
          <Link to={`job/${job._id}`} className="m-auto">
            <button className="m-2 p-2 bg-[#607D8B] text-[#81D4FA] text-lg font-semibold rounded-md">
              View Job
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default jobListings;
