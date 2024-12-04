const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const api = supertest(app);

beforeAll(async () => {
    await User.deleteMany({});
});

describe('User Routes', () => {
    describe('POST /api/users/signup', () => {
        it('should create a new user', async () => {
            const response = await api.post('/api/users/signup').send({
                "name": "John Doe",
                "username": "johndoe1235",
                "password": "securepassword123",
                "phone_number": "987-654-3210",
                "gender": "Male",
                "date_of_birth": "1990-01-15",
                "membership_status": "Active",
                "address": "123 Elm Street, Springfield, IL, 62704",
                "profile_picture": "https://example.com/images/johndoe123.jpg"
            });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');

        });

        it('should not create a new user with missing required fields', async () => {
            const response = await api.post('/api/users/signup').send({
                "name": "John Doe",
                "username": "johndoe1235",
                "password": "securepassword123",
                "phone_number": "987-654-3210",
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Please add all fields');
        });
    });

    describe('POST /api/users/login', () => {
        it('should login a user', async () => {
            const response = await api.post('/api/users/login').send({
                "username": "johndoe1235",
                "password": "securepassword123"
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should not login a user with incorrect credentials', async () => {
            const response = await api.post('/api/users/login').send({
                "username": "johndoe1235",
                "password": "wrongpassword"
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Invalid username or password");
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
});