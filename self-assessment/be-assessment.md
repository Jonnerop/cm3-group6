# Self-assessment for BE

## Applying User Authorization

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

- The updated tests account for edge cases, such as missing or invalid tokens making sure that the API properly handles these situations.

- Tests now align with the updated job controller where authentication is required. This way the tests are more robust and reflect the actual behavior of the API.