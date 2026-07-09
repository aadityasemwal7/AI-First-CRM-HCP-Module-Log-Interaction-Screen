/*
  Navbar.jsx
  ----------
  Top-level navigation bar rendered on every page.
  Will contain the app logo, navigation links, and user actions.
*/

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-800">AI HCP Module</h1>
    </nav>
  );
};

export default Navbar;
