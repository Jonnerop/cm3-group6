# Self-assessment for FE


### Code structure
- We followed logical separation of concerns by separating components, pages, hooks and context to improve maintainability and scalability. The context directory uses React's Context API, which is used for managing global state without prop drilling. 

### Login functionality
- Login uses a custom hook ``useLogin.jsx`` to encapsulates login logic, making it reusable and clean. The Login component focuses solely on UI and event handling. 

Lessons learned: