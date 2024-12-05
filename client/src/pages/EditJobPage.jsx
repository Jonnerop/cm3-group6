import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const EditJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user, token } = useAuth();

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

  const updateJob = async (updatedJob) => {
    try {
      const response = await fetch(
        `https://cm3-group6-api-v2-auth-protection.onrender.com/api/jobs/${updatedJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedJob),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update job");
      }
      return response.ok;
    } catch (error) {
      console.error("Error updating job:", error);
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
        setPostedDate(data.postedDate.split("T")[0]);
        setStat(data.stat);
        setApplicationDeadline(data.applicationDeadline.split("T")[0]);
        setRequirements(data.requirements);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedJob = {
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
      postedDate,
      status: stat,
      applicationDeadline,
      requirements,
    };
    const success = await updateJob(updatedJob);
    if (success) {
      navigate(`/job/${job._id}`);
    } else {
      alert("Failed to update job");
      console.error("Failed to update job");
    }
  };

  return (
    <div
      id="editJobPage"
      className="min-h-screen bg-[#B3E5FC] flex items-center justify-center py-8"
    >
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#607D8B] mb-6 text-center">
          Edit Job
        </h1>
        {loading ? (
          <div className="text-center text-[#607D8B]">Loading...</div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
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
                htmlFor="companyUrl"
              >
                Company URL:
              </label>
              <input
                type="url"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
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
                className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#29B6F6] text-white rounded-md shadow-sm hover:bg-[#4FC3F7] font-medium"
            >
              Update Job
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditJobPage;
