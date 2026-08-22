import style from "./Login.module.css";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router";
function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // Prevent multiple submissions
    setError(null);
    setSubmitting(true);
    try {
      await login(formData.username, formData.password);
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      setError(error.message || "Unable to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={style.loginPage}>
      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}
      <div className={style.loginForm}>
        <div className={style.loginHeading}>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className={style.formLabel}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>
          <div>
            <label htmlFor="password" className={style.formLabel}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>
          <div>
            Don't have an account?
            <Link to="/register" className={style.registerLink}>
              {" "}
              Register here.
            </Link>
          </div>
          <button type="submit" className={style.formButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
