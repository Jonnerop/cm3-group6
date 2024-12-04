import { useEffect, useState } from 'react';
import JobListings from '../components/JobListings';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/jobs');
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
    <div id="homePage">
      <h1>Job Listings</h1>
      {isPending && <div>Loading...</div>}
      {jobs && <JobListings jobs={jobs} />}
    </div>
  );
};
export default HomePage;
