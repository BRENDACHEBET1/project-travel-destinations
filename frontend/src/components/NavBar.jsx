import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated, logout } from "../api/backend";

function Navbar() {
  const navigate = useNavigate();
  const signedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="relative z-20 border-b border-sky-200/10 bg-slate-950/95 text-white shadow-xl shadow-slate-950/30 backdrop-blur-md">
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
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-sky-400/20 text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-sky-400/20 text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Destinations
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-sky-400/20 text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/saved-destinations"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-sky-400/20 text-white shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Saved
          </NavLink>

          {signedIn ? (
            <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3">
              <span className="flex max-w-40 items-center gap-2 rounded-full bg-sky-400/15 px-3 py-2 text-sm font-semibold text-sky-100" title={currentUser?.username}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
                <span className="truncate">{currentUser?.username || "Signed in"}</span>
              </span>
              <button type="button" onClick={handleLogout} className="rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-red-400/10 hover:text-red-200">
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `ml-2 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${isActive ? "border-sky-300 bg-sky-300 text-slate-950" : "border-sky-300/60 bg-sky-400/10 text-sky-100 hover:border-sky-200 hover:bg-sky-300 hover:text-slate-950"}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="8" r="3" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
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
                <>
                  <span className="truncate px-3 pt-3 text-sm font-medium text-sky-200">
                    {currentUser?.username || "Signed in"}
                  </span>
                  <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-3 text-left font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                    Sign out
                  </button>
                </>
              ) : (
                <NavLink to="/login" className={({ isActive }) => `flex items-center gap-2 rounded-lg bg-sky-400/10 px-3 py-3 font-medium text-sky-100 transition ${isActive ? "bg-sky-300 text-slate-950" : "hover:bg-sky-300 hover:text-slate-950"}`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                  </svg>
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
