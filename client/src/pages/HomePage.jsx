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

  return (
    <div id="homePage" className="flex flex-col bg-[#F5F5F5]">
      <div className="flex m-auto">
        <h1 className="text-[#29B6F6] text-xl font-semibold">Job Listings</h1>
      </div>
      <div
        id="Jobs-container"
        className="flex flex-wrap justify-center w-screen"
      >
        {isPending && <div className="border">Loading...</div>}
        {jobs && <JobListings jobs={jobs} />}
      </div>
    </div>
  );
};
export default HomePage;
