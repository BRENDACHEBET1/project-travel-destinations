import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          WorldExplorer
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Destinations
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;