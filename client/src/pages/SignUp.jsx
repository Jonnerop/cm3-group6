import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
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

  return (
    <div className="create min-h-screen bg-[#B3E5FC] flex items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#607D8B] mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Name:
            </label>
            <input
              {...name}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Username:
            </label>
            <input
              {...userName}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Password:
            </label>
            <input
              {...password}
              type="password"
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Phone Number:
            </label>
            <input
              {...phoneNumber}
              type="tel"
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Gender:
            </label>
            <input
              {...gender}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Date of Birth:
            </label>
            <input
              {...dateOfBirth}
              type="date"
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Membership Status:
            </label>
            <select
              {...membershipStatus}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm focus:ring-[#29B6F6] focus:border-[#29B6F6]"
            >
              <option value="">Select membership status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Address:
            </label>
            <input
              {...address}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Profile Picture:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-[#B0BEC5] bg-[#F5F5F5] p-2 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#29B6F6] text-white rounded-md shadow-sm hover:bg-[#4FC3F7] font-medium"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
