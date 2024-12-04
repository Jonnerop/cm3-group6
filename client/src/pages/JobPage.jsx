import React, { useEffect, useState } from "react";
import JobListing from "../components/JobListing";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteJob();
    navigate("/");
  };

  return (
    <div className="flex bg-[#F5F5F5] justify-center items-center w-screen h-[100%]">
      <div
        id="job-container"
        className="flex flex-col bg-[#E0E0E0] border rounded-lg shadow-md p-4"
      >
        <JobListing {...job} />
        <div className="flex justify-between">
          <button className="m-2 p-2 bg-[#607D8B] text-[#81D4FA] text-lg font-semibold rounded-md">
            Apply
          </button>
          <Link to={`/job/${job._id}/edit`}>
            <button className="m-2 p-2 bg-[#607D8B] text-[#81D4FA] text-lg font-semibold rounded-md">
              Edit Job
            </button>
          </Link>
          <button
            className="m-2 p-2 bg-[#607D8B] text-[#81D4FA] text-lg font-semibold rounded-md"
            onClick={handleDelete}
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
