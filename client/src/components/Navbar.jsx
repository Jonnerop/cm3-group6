import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <nav
      id="navbar"
      className="flex w-screen border justify-between bg-[#E0E0E0]"
    >
      <h1 className="ml-24 text-[#4FC3F7] text-3xl font-semibold">
        Job Search
      </h1>
      <div id="links" className="flex mr-72 items-center">
        <a href="/" className="mx-5 text-[#29B6F6] text-xl font-semibold">
          Home
        </a>
        <a href="/create" className="mx-5 text-[#29B6F6] text-xl font-semibold">
          Add Job
        </a>
        {!isAuthenticated ? (
          <>
            <a href="/signup" className="mx-5 text-[#29B6F6] text-xl font-semibold">
              Sign Up
            </a>
            <a href="/login" className="mx-5 text-[#29B6F6] text-xl font-semibold">
              Login
            </a>
          </>
        ) : (
          <button onClick={logout} className="mx-5 text-[#29B6F6] text-xl font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
