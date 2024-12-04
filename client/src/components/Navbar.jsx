const Navbar = () => {
  return (
    <nav id="navbar" className="flex w-screen border justify-between">
      <h1 className="ml-24">Job Search</h1>
      <div id="links" className="flex mr-24">
        <a href="/" className="mx-4">
          Home
        </a>
        <a href="/create" className="mx-4">
          Add Job
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
