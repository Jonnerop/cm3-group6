import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
const server = import.meta.env.VITE_API_URL


const Login = () => {
  const navigate = useNavigate();
  const username = useField("username");
  const password = useField("password");

  const { login, error } = useLogin(
    `${server}/api/users/login`
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({
      username: username.value,
      password: password.value,
    });
    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="login min-h-screen bg-[#B3E5FC] flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#607D8B] mb-6 text-center">
          Log in
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#607D8B]">
              Username:
            </label>
            <input
              {...username}
              type="text"
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#29B6F6] text-white rounded-md shadow-sm hover:bg-[#4FC3F7] font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
