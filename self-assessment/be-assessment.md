# Self-assessment for BE

## Applying User Authorization for tests

- The tests that were initially made for API V1 didn't handle user authentication, so in API V2 after the implementation of the user model. Tests were made to make use of the authorization through a mock jwt token.

### Initial implementation

- For example the initial implementation of the delete job and its errors did not take into account authorization so the tests assumed that everyone has the capability of removing a job without a user. After the addition of the authorization and protected routes for create, update, and delete operations the tests had to be remade to consider the token.

```js
describe("Deleting a job", () => {
        describe("DELETE /api/jobs/:id", () => {
            it("should delete a job", async () => {
                const job = await Job.findOne();
                await api
                    .delete(`/api/jobs/${job.id}`)
                    .expect(204);
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
```

### After the Needed Modification

- After the inclusion of the authorization in the job controller the test were made to accoomodate this change. This meant that the api request had to now include the token by setting `.set('Authorization', 'bearer ' + token)`. The token itself would be setup at the beginning of the test as `let token = null;`. This way we can take into account the change in controllers and test the possible edge cases, like when a job id is missing.

```js
describe("Deleting a job", () => {
        describe("DELETE /api/jobs/:id", () => {
            it("should delete a job", async () => {
                const job = await Job.findOne();
                await api
                    .delete(`/api/jobs/${job.id}`)
                    .set('Authorization', 'bearer ' + token)
                    .expect(204);
                const jobsAtEnd = await Job.find({});
                expect(jobsAtEnd).toHaveLength(initialJobs.length - 1);
            });
            it("should return 400 if job does not exist", async () => {
                const invalidId = "123456789012";
                await api
                    .delete(`/api/jobs/${invalidId}`)
                    .set('Authorization', 'bearer ' + token)
                    .expect(400);
            });
        });
    });
```

### Key Improvements

- The updated tests make sure that only users with a valid JWT token can delete jobs. Previously the tests allowed anyone to delete a job without checking for any authentication.

- Tests now align with the updated job controller where authentication is required. This way the tests are more robust and reflect the actual behavior of the API.

## Error Handling Logic

### Error Handling Middleware

- The `errorHandler` middleware is a general error-handling mechanism that captures any unhandled errors in the application. It logs the error message for debugging purposes and returns a `500 Internal Server Error` response.

```js
const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({ error: error.message });
};
```

- The `unknownEndpoint` middleware handles cases where a client tries to access a non-existent route. It returns a `404 Not Found` status with a relevant error message.

```js
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
```

### Job Routes

- In each CRUD operation, try-catch blocks are used to handle errors and respond with appropriate status codes and messages.

- For example, in the POST request to create a new job, the operation checks for missing fields and returns a `400 Bad Request` error if any required fields are missing.

```js
const createJob = async (req, res, next) => {
    try {
        const { title, type, description, company, location, salary } = req.body;
        if (!title || !type || !description || !location || !salary || !company?.name || !company?.contactEmail || !company?.contactPhone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newJob = await Job.create({ ...req.body });
        res.status(201).json(newJob);
    } catch (error) {
        next(error);
    }
};
```

- Server-related issues are caught and responded to with a `500 Internal Server Error` status code.

### User Routes

- During user signup and login, checks are in place to ensure all required fields are provided. If any required fields are missing or if there are issues such as duplicate users or invalid credentials, the API returns a `400 Bad Request` error with specific messages.

```js
const signup = async (req, res, next) => {
    try {
        const { name, username, password, phone_number, gender, date_of_birth, membership_status, address } = req.body;
        if (!name || !username || !password || !phone_number || !gender || !date_of_birth || !membership_status || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newUser = await User.create({ ...req.body });
        res.status(201).json({ token: generateToken(newUser._id) });
    } catch (error) {
        next(error);
    }
};
```

### Authentication Middleware

- The `requireAuth` middleware checks for the presence of a valid JWT token in the request headers. If no token is found or if it's invalid, the user receives a `401 Unauthorized` error. This ensures that only authenticated users can access protected routes.

```js
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
```

### Key Improvements

- **Logging**: Errors are logged to the console, which helps in identifying and fixing issues during development and production.
- **Status Codes**: Proper HTTP status codes are used to indicate the type of error. For example, a `500` status code is used for server errors, and a `400` status code is used for client errors.
- **Validation**: Input validation ensures that required fields are provided and that data integrity is maintained. This helps prevent common issues and provides clear feedback to the client.