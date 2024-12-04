import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [stat, setStat] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirements, setRequirements] = useState('');

  const updateJob = async (updatedJob) => {
    try {
      const response = await fetch(`/api/jobs/${updatedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      if (!response.ok) {
        throw new Error('Failed to update job');
      }
      return response.ok;
    } catch (error) {
      console.error('Error updating job:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error(`Could not fetch job, status: ${response.status}`);
        }
        const data = await response.json();
        setJob(data);

        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
        setWebsite(data.company.website);
        setLocation(data.location);
        setSalary(data.salary);
        setPostedDate(data.postedDate);
        setStat(data.stat);
        setApplicationDeadline(data.applicationDeadline);
        setRequirements(data.requirements);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id: job.id,
      title,
      type,
      description,
      company: {
        companyName,
        companyEmail,
        companyPhone,
        companyUrl,
      },
      location,
      salary,
      postedDate,
      stat,
      applicationDeadline,
      requirements,
    };
    const success = await updateJob(updatedJob);
    if (success) {
      navigate(`/jobs/${job.id}`);
    } else {
      alert('Failed to update job');
      console.error('Failed to update job');
    }
  };

  return (
    <div id="editJobPage">
      <h1>Edit Job</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <label htmlFor="companyEmail">Company Email</label>
          <input
            type="email"
            id="companyEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <label htmlFor="companyPhone">Company Phone</label>
          <input
            type="tel"
            id="companyPhone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <label htmlFor="companyUrl">Company URL</label>
          <input
            type="url"
            id="companyUrl"
            value={website}
            onChange={(e) => setCompanyUrl(e.target.value)}
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <label htmlFor="postedDate">Posted Date</label>
          <input
            type="date"
            id="postedDate"
            value={postedDate}
            onChange={(e) => setPostedDate(e.target.value)}
          />
          <label htmlFor="stat">Stat</label>
          <input
            type="text"
            id="stat"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
          />
          <label htmlFor="applicationDeadline">Application Deadline</label>
          <input
            type="date"
            id="applicationDeadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
          <button type="submit">Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;
