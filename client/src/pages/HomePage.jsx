import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error(`Could not fetch jobs, status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setIsPending(false);
      } catch (error) {
        console.error("Error:", error);
        setIsPending(false);
      }
    };
    fetchJobs();
  }, [jobs]);

  console.log(isPending);

  return (
    <div id="homePage" className="flex flex-col">
      <div className="flex m-auto">
        <h1>Job Listings</h1>
      </div>
      <div id="Jobs-container" className="flex flex-wrap justify-between">
        {isPending && <div className="border">Loading...</div>}
        {jobs && <JobListings jobs={jobs} />}
      </div>
    </div>
  );
};
export default HomePage;
