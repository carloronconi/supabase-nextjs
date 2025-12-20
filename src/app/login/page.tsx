import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <section className="page-section">
      <div className="surface-card">
        <div className="section-heading">
          <p className="eyebrow">Welcome back</p>
          <h1>Access your workspace</h1>
          <p>Log in or create a new account to manage your Supabase profile.</p>
        </div>
        <form className="form-grid">
          <div className="fieldset">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-control"
              required
            />
          </div>
          <div className="fieldset">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-control"
              required
            />
          </div>
          <div className="form-actions">
            <button
              formAction={login}
              type="submit"
              className="btn btn-primary btn-full-mobile"
            >
              Log in
            </button>
            <button
              formAction={signup}
              type="submit"
              className="btn btn-ghost btn-full-mobile"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
