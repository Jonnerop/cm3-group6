import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJobPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [stat, setStat] = useState('Open');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirements, setRequirements] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const addJob = async (newJob) => {
    console.log(newJob);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error('Failed to add job');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    //convert requirements string to an array
    const requirementsArray = requirements
      .split('.') //split by period
      .map((req) => req.trim()) //trim whitespace around each item
      .filter((req) => req.length > 0); //remove empty strings

    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
        website,
      },
      location,
      salary,
      postedDate: postedDate.split('T')[0],
      stat,
      applicationDeadline,
      requirements: requirementsArray, //add as an array
    };

    addJob(newJob);
    navigate('/');
  };

  return (
    <div className="addJobPage min-h-screen bg-[#B3E5FC] flex items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#607D8B] mb-6 text-center">
          Add Job
        </h1>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="type"
            >
              Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="companyName"
            >
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="contactEmail"
            >
              Company Email:
            </label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="contactPhone"
            >
              Company Phone:
            </label>
            <input
              type="tel"
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="website"
            >
              Company Website:
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.example.com"
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="location"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="salary"
            >
              Salary:
            </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="postedDate"
            >
              Posted Date:
            </label>
            <input
              type="date"
              id="postedDate"
              value={postedDate}
              onChange={(e) => setPostedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="stat"
            >
              Status:
            </label>
            <select
              value={stat}
              onChange={(e) => setStat(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="applicationDeadline"
            >
              Application Deadline:
            </label>
            <input
              type="date"
              id="applicationDeadline"
              value={applicationDeadline}
              onChange={(e) => setApplicationDeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#607D8B]"
              htmlFor="requirements"
            >
              Requirements:
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter the job requirements. Separate each requirement with a period."
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#29B6F6] text-white rounded-md shadow-sm hover:bg-[#4FC3F7] font-medium"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
