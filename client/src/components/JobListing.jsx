import React from "react";

function JobListing({
  title,
  type,
  description,
  company: { name, contactEmail, contactPhone, website },
  location,
  salary,
  postedDate,
  stat,
  deadline,
  requirements,
}) {
  return (
    <div className="border border-red-500">
      <h2>Title: {title}</h2>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Company: {name}</p>
      <p>contactEmail: {contactEmail}</p>
      <p>contactPhone: {contactPhone}</p>
      <p>website: {website}</p>
      <p>location: {location}</p>
      <p>salary: {salary}</p>
      <p>postedDate: {postedDate}</p>
      <p>status: {stat}</p>
      <p>Application deadline: {deadline}</p>
      <p>requirements: {requirements}</p>
    </div>
  );
}

export default JobListing;
