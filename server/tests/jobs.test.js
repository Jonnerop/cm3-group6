const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Job = require('../models/jobModel');
const api = supertest(app);

const initialJobs = [
    {
        "title": "Software Engineer",
        "type": "Full-time",
        "description": "We are looking for a talented Software Engineer to join our team.",
        "company": {
            "name": "Tech Innovators Inc.",
            "contactEmail": "hr@techinnovators.com",
            "contactPhone": "123-456-7890",
            "website": "https://www.techinnovators.com/"
        },
        "location": "San Francisco, CA",
        "salary": 120000,
        "status": "open",
        "applicationDeadline": "2024-12-31T23:59:59.000Z",
        "requirements": [
            "Bachelor's degree in Computer Science or related field",
            "3+ years of experience with JavaScript and Node.js",
            "Familiarity with modern frontend frameworks like React or Vue",
            "Experience with MongoDB and RESTful APIs"
        ]
    },
    {
        "title": "Product Manager",
        "type": "Full-time",
        "description": "We are looking for a Product Manager to lead our product team.",
        "company": {
            "name": "Tech Innovators Inc.",
            "contactEmail": "hr@techinnovators.com",
            "contactPhone": "123-456-7890",
            "website": "https://www.techinnovators.com/"
        },
        "location": "San Francisco, CA",
        "salary": 150000,
        "status": "open",
        "applicationDeadline": "2024-12-31T23:59:59.000Z",
        "requirements": [
            "Bachelor's degree in Business Administration or related field",
            "5+ years of experience in product management",
            "Experience with Agile methodologies",
            "Strong analytical and problem-solving skills"
        ]
    }
];

describe('Jobs API', () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        await Job.insertMany(initialJobs);
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    describe("Fetching jobs", () => {
        describe("GET /api/jobs", () => {
            it("should return all jobs", async () => {
                const response = await api.get('/api/jobs');
                expect(response.status).toBe(200);
                expect(response.body).toHaveLength(initialJobs.length);
            });
            it("should return jobs as JSON", async () => {
                await api
                    .get('/api/jobs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
            });
        });
    });

    describe("Creating a new job", () => {
        describe("POST /api/jobs", () => {
            it("should create a new job", async () => {
                const newJob = {
                    "title": "Data Analyst",
                    "type": "Full-time",
                    "description": "We are looking for a Data Analyst to join our team.",
                    "company": {
                        "name": "Tech Innovators Inc.",
                        "contactEmail": "hr@techinnovators.com",
                        "contactPhone": "123-456-7890",
                        "website": "https://www.techinnovators.com/"
                    },
                    "location": "San Francisco, CA",
                    "salary": 100000,
                    "status": "open",
                    "applicationDeadline": "2024-12-31T23:59:59.000Z",
                    "requirements": [
                        "Bachelor's degree in Statistics or related field",
                        "2+ years of experience in data analysis",
                        "Experience with SQL and Python",
                        "Strong analytical and problem-solving skills"
                    ]
                };
                const response = await api
                    .post('/api/jobs')
                    .send(newJob)
                    .expect(201)
                    .expect('Content-Type', /application\/json/);

                const jobsAtEnd = await Job.find({});
                expect(jobsAtEnd).toHaveLength(initialJobs.length + 1);
                expect(response.body.title).toBe(newJob.title);
            });
        });
    });

    describe("Fetching a single job", () => {
        describe("GET /api/jobs/:id", () => {
            it("should return a single job", async () => {
                const job = await Job.findOne();
                const response = await api
                    .get(`/api/jobs/${job.id}`)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
                expect(response.body.title).toBe(job.title);
            });
            it("should return 400 if job does not exist", async () => {
                const invalidId = "123456789012";
                await api
                    .get(`/api/jobs/${invalidId}`)
                    .expect(400);
            });
        });
    });

    describe("Updating a job", () => {
        describe("PUT /api/jobs/:id", () => {
            it("should update a job", async () => {
                const job = await Job.findOne();
                const updatedJob = {
                    "type": "Part-time",
                };
                await api
                    .put(`/api/jobs/${job.id}`)
                    .send(updatedJob)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);
            });
            it("should return 400 if job does not exist", async () => {
                const invalidId = "123456789012";
                await api
                    .put(`/api/jobs/${invalidId}`)
                    .expect(400);
            });
        });
    });

    describe("Deleting a job", () => {
        describe("DELETE /api/jobs/:id", () => {
            it("should delete a job", async () => {
                const job = await Job.findOne();
                await api
                    .delete(`/api/jobs/${job.id}`)
                    .expect(200);
                const jobsAtEnd = await Job.find({});
                expect(jobsAtEnd).toHaveLength(initialJobs.length - 1);
            });
            it("should return 400 if job does not exist", async () => {
                const invalidId = "123456789012";
                await api
                    .delete(`/api/jobs/${invalidId}`)
                    .expect(400);
            });
        });
    });
});

