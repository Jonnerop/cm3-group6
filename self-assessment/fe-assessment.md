# Self-assessment for FE

## Code structure
- We followed logical separation of concerns by separating components, pages, hooks and context to improve maintainability and scalability. The context directory uses React's Context API, which is used for managing global state without prop drilling.  

## Adding a Job according to the Job Model

In ``AddJobPage.jsx`` the job model required the ``requirements`` field to be an array. Initially, the ``requirements`` input was handled as a string and persisted as such in the ``newJob`` object:
```js
const newJob = {
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
      postedDate: postedDate.split('T')[0],
      stat,
      applicationDeadline,
      requirements
    };
```

However, to meet the model's requirement of storing ``requirements`` as an array, input handling was updated. The string was processed by splitting it into an array of trimmed strings, filtering out any empty elements:

```js
const requirementsArray = requirements
      .split('.') 
      .map((req) => req.trim()) 
      .filter((req) => req.length > 0);

    const newJob = {
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
      postedDate: postedDate.split('T')[0],
      stat,
      applicationDeadline,
      requirements: requirementsArray, //add as an array
    };
```

### Lessons learned:
1. Understanding Data Models: Aligning frontend data structures with backend models is critical for ensuring smooth API communication.
2. Data Transformation: Input data often needs to be processed or transformed to match the expected format, especially when dealing with collections like arrays.
3. Flexibility in Design: Handling the requirements field as a string initially allowed for simpler user input, while transformation into an array enabled compatibility with the backend.

## SignUp Function

### Initial Implementation

The initial implementation of the signUp-function could not handle file uploads. File uploads are crucial, because the user model includes a profile-picture. A typical JSON body cannot handle file uploads properly:

```js
const newUser = {
    name,
    userName,
    password,
    phoneNumber,
    gender,
    dateOfBirth,
    membershipStatus,
    address,
    profilePicture
};
```

### Addressing the Issue

To address the issue, FormData was used instead of a typical JSON body. FormData can handle file transfers and is compatible with all browsers. In addition to using FormData, we added some additional checks to check for profile pictures and debug logging. This also required some changes in the backend. Here is the current implementation:

```js
const navigate = useNavigate();
  const name = useField("text");
  const userName = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const address = useField("text");
  const [profilePicture, setProfilePicture] = useState(null);
  const { signup, error } = useSignup(`/api/users/signup`);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("username", userName.value);
    formData.append("password", password.value);
    formData.append("phone_number", phoneNumber.value);
    formData.append("gender", gender.value);
    formData.append("date_of_birth", dateOfBirth.value);
    formData.append("membership_status", membershipStatus.value);
    formData.append("address", address.value);

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    signup(formData);
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
```

The current signup-function includes error handling, debugging, and the ability to handle file uploads and transfers.

### Key Improvements

-FormData: Uses FormData so that files can be transferred and uploaded.
-Error handling and debugging: Ensures the endpoint can optionally take in files.
