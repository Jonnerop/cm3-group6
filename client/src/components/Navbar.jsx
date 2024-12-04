const Navbar = () => {
  return (
    <nav
      id="navbar"
      className="flex w-screen border justify-between bg-[#E0E0E0]"
    >
      <h1 className="ml-24 text-[#4FC3F7] text-3xl font-semibold">
        Job Search
      </h1>
      <div id="links" className="flex mr-72 items-center">
        <a href="/" className="mx-6 text-[#29B6F6] text-xl font-semibold">
          Home
        </a>
        <a href="/create" className="mx-6 text-[#29B6F6] text-xl font-semibold">
          Add Job
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
