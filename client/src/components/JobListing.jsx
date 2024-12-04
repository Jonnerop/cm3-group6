import React, { useEffect, useState } from "react";

function JobListing({
  title,
  type,
  description,
  company = {},
  location,
  salary,
  postedDate,
  status,
  applicationDeadline,
  requirements,
}) {
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (postedDate && applicationDeadline) {
      setDate(postedDate.split("T")[0]);
      setDeadline(applicationDeadline.split("T")[0]);
    }
  }, []);
  return (
    <div className="bg-[#E0E0E0] p-2">
      <h2 className="text-[#29B6F6] text-3xl font-semibold text-center mb-2">
        {title}
      </h2>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Company: {company.name}</p>
      <p>contactEmail: {company.contactEmail}</p>
      <p>contactPhone: {company.contactPhone}</p>
      <p>website: {company.website}</p>
      <p>location: {location}</p>
      <p>salary: {salary}</p>
      <p>postedDate: {date}</p>
      <p>status: {status}</p>
      <p>Application deadline: {deadline}</p>
      <p>requirements: {requirements}</p>
    </div>
  );
}

export default JobListing;
