const Job = require('../models/jobModel');
const mongoose = require('mongoose');

//GET all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to retrieve all jobs: ${error.message}` });
  }
};

//POST a new job
const createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      company,
      location,
      salary,
      user_id,
    } = req.body;

    if (!title || !type || !description
      || !location || !salary || !company?.name
      || !company?.contactEmail || !company?.contactPhone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userId = req.user._id;
    const newJob = await Job.create({
      ...req.body,
      user_id: userId,
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: `Failed to create job: ${error.message}` });
  }
};

//GET a job by ID
const getJobById = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ message: `Job with ID ${jobId} not found` });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to retrieve job: ${error.message}` });
  }
};

//PUT update a job by ID
const updateJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const user_id = req.user._id;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!updatedJob) {
      res.status(404).json({ message: `Job with ID ${jobId} not found` });
    } else {
      res.status(200).json(updatedJob);
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to update job: ${error.message}` });
  }
};

//DELETE a job by ID
const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const user_id = req.user._id;
    const deletedJob = await Job.findOneAndDelete({
      _id: jobId,
      user_id: user_id,
    });
    if (!deletedJob) {
      res.status(404).json({ message: `Job with ID ${jobId} not found` });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to delete job: ${error.message}` });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
