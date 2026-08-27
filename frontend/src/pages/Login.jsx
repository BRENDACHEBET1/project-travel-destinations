import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, register } from "../api/backend";
import NavBar from "../components/NavBar";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await (isRegistering ? register(form) : login(form));
      navigate(location.state?.from || "/saved-destinations");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-md px-6 py-12">
        <h1 className="text-3xl font-bold">{isRegistering ? "Create an account" : "Welcome back"}</h1>
        <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow">
          {isRegistering && <input name="username" value={form.username} onChange={updateField} placeholder="Username" required className="w-full rounded border p-3" />}
          <input name="email" type="email" value={form.email} onChange={updateField} placeholder="Email" required className="w-full rounded border p-3" />
          <input name="password" type="password" value={form.password} onChange={updateField} placeholder="Password" minLength="8" required className="w-full rounded border p-3" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={submitting} className="w-full rounded bg-blue-600 px-4 py-3 font-medium text-white disabled:bg-slate-400">
            {submitting ? "Please wait..." : isRegistering ? "Create account" : "Sign in"}
          </button>
        </form>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="mt-5 text-blue-600">
          {isRegistering ? "Already have an account? Sign in" : "New here? Create an account"}
        </button>
      </main>
    </div>
  );
}

export default Login;
