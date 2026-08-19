import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="relative z-20 border-b border-white/15 bg-slate-950/90 text-white shadow-lg shadow-slate-950/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition"
        >
          <span
            aria-hidden="true"
            className="relative grid h-9 w-9 place-items-center rounded-full border-2 border-sky-300/90 bg-sky-400/15 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition group-hover:scale-105 group-hover:bg-sky-400/25"
          >
            <span className="absolute h-4 w-7 rounded-[50%] border-y border-sky-200/90" />
            <span className="h-7 w-3 rounded-[50%] border-x border-sky-200/90" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[0.12em] text-white">
              WORLD
            </span>
            <span className="mt-0.5 text-[0.65rem] font-bold tracking-[0.28em] text-sky-300">
              EXPLORER
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
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
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
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
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
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
