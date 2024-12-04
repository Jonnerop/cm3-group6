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
        <a href="/signup" className="mx-4">Sign Up</a>
        <a href="/login" className="mx-4">Login</a>
      </div>
    </nav>
  );
};
export default Navbar;
