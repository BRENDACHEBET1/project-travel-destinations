import { Link, NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../api/backend";

function Navbar() {
  const navigate = useNavigate();
  const signedIn = isAuthenticated();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="relative z-20 border-b border-white/15 bg-slate-950/90 text-white shadow-lg shadow-slate-950/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
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
        <div className="hidden items-center gap-6 md:flex">
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

          <NavLink
            to="/saved-destinations"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-white" : "text-slate-300 hover:text-white"
              }`
            }
          >
            Saved
          </NavLink>

          {signedIn ? (
            <button type="button" onClick={handleLogout} className="font-medium text-slate-300 transition hover:text-white">
              Sign out
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `font-medium transition ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`}>
              Sign in
            </NavLink>
          )}
        </div>

        <details className="group relative md:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-lg text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle navigation menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2 group-open:hidden">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-6 w-6 fill-none stroke-current stroke-2 group-open:block">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </summary>
          <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-white/15 bg-slate-950 p-2 shadow-xl shadow-slate-950/40">
            <div className="flex flex-col gap-1">
              <NavLink to="/" className={({ isActive }) => `rounded-lg px-3 py-3 font-medium transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                Home
              </NavLink>
              <NavLink to="/destinations" className={({ isActive }) => `rounded-lg px-3 py-3 font-medium transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                Destinations
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `rounded-lg px-3 py-3 font-medium transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                About
              </NavLink>
              <NavLink to="/saved-destinations" className={({ isActive }) => `rounded-lg px-3 py-3 font-medium transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                Saved
              </NavLink>
              {signedIn ? (
                <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-3 text-left font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                  Sign out
                </button>
              ) : (
                <NavLink to="/login" className={({ isActive }) => `rounded-lg px-3 py-3 font-medium transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                  Sign in
                </NavLink>
              )}
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}

export default Navbar;
