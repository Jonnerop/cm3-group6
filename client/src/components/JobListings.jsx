import React from 'react';
import JobListing from './JobListing';
import { Link } from 'react-router-dom';

function jobListings({ jobs }) {
  return (
    <div
      className={`grid gap-6 justify-items-center ${
        jobs.length >= 3
          ? 'grid-cols-3'
          : jobs.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-1'
      }`}
    >
      {jobs.map((job) => (
        <div
          key={job._id}
          className="flex flex-col border rounded-lg p-4 bg-[#E0E0E0] m-4 w-[200px]"
        >
          <h2 className="m-auto text-[#29B6F6] text-xl font-semibold">
            {job.title}
          </h2>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <p>Salary: {job.salary}</p>
          <Link to={`job/${job._id}`} className="m-auto">
            <button className="m-2 p-2 bg-[#607D8B] text-[#81D4FA] text-lg font-semibold rounded-md mt-4">
              View Job
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default jobListings;
