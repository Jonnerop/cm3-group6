import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [job, setJob] = useState(null);

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
      const response = await fetch(`/api/jobs/${updatedJob.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });
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
      id: job._id,
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
      <div className="max-w-xl w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#607D8B]">Edit Job</h1>
        {loading ? (
          <div className="text-center text-[#607D8B]">Loading...</div>
        ) : (
          <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 pt-2 block rounded-md shadow-md text-[#607D8B] bg-[#E0E0E0]"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Company Email
              </label>
              <input
                type="email"
                id="companyEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="companyPhone"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Company Phone
              </label>
              <input
                type="tel"
                id="companyPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="companyUrl"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Company URL
              </label>
              <input
                type="url"
                id="companyUrl"
                value={website}
                onChange={(e) => setCompanyUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#B0BEC5] shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="postedDate"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Posted Date
              </label>
              <input
                type="date"
                id="postedDate"
                value={postedDate}
                onChange={(e) => setPostedDate(e.target.value)}
                className="mt-1 p-1 block w-full rounded-md bg-[#E0E0E0] shadow-md text-[#607D8B]"
              />
            </div>
            <div div className="flex flex-col items-center justify-center">
              <label
                htmlFor="stat"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Status
              </label>
              <select
                value={stat}
                onChange={(e) => setStat(e.target.value)}
                className="mt-1 pt-2 block rounded-md shadow-md text-[#607D8B] bg-[#E0E0E0]"
              >
                <option value="Open">Open</option>
                <option value="Cloder">Closed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Application Deadline
              </label>
              <input
                type="date"
                id="applicationDeadline"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="mt-1 p-1 block w-full rounded-md bg-[#E0E0E0] shadow-md text-[#607D8B]"
              />
            </div>
            <div>
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-[#607D8B]"
              >
                Requirements
              </label>
              <textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="mt-1 block w-full rounded-md border-[#E0E0E0] shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#607D8B] text-white rounded-md shadow-md"
              >
                Update Job
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditJobPage;
