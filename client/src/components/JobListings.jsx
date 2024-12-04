import React from "react";
import JobListing from "./JobListing";

function jobListings() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [jobs]);

  return (
    <div>
      <h1>All Jobs</h1>
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
