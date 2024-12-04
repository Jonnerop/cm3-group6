import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [stat, setStat] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [requirements, setRequirements] = useState("");

  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

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
      postedDate: postedDate.split("T")[0],
      status: stat,
      applicationDeadline: applicationDeadline.split("T")[0],
      requirements,
    };
    addJob(newJob);
    navigate("/");
  };

  return (
    <div id="addJobPage">
      <h1>Add Job</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
        </select>
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
          onChange={(e) => setWebsite(e.target.value)}
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
        <label htmlFor="stat">Status</label>
        <select
          id="status"
          value={stat}
          onChange={(e) => setStat(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select job vacancy</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
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
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
