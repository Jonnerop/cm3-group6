import { useEffect, useState } from 'react';
import JobListings from '../components/JobListings';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`Could not fetch jobs, status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setIsPending(false);
      } catch (error) {
        console.error('Error:', error);
        setIsPending(false);
      }
    };
    fetchJobs();
  }, [jobs]);

  return (
    <div className="h-screen bg-[#B3E5FC]">
      <div id="homePage" className="flex flex-col">
        <div className="flex m-auto">
          <h1 className="text-white text-border text-2xl font-bold mt-4 [text-shadow:_0_1px_2px_black]">JOB LISTINGS</h1>
        </div>
        <div
          id="Jobs-container"
          className="flex flex-wrap justify-center w-screen"
        >
          {isPending && <div className="border">Loading...</div>}
          {jobs && <JobListings jobs={jobs} />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
