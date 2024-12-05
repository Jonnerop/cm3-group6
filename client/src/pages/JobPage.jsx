import React, { useEffect, useState } from 'react';
import JobListing from '../components/JobListing';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

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
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    navigate('/');
  };

  return (
    <div className="flex bg-[#B3E5FC] justify-center w-screen h-screen">
      <div
        id="job-container"
        className="flex flex-col bg-[#E0E0E0] border rounded-lg shadow-md p-4 mt-8 h-[450px]"
      >
        <JobListing {...job} />
        {isAuthenticated ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default JobPage;
