import style from "./Register.module.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
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
    if (submitting) return;
    setError([]);
    setSubmitting(true);
    try {
      await register(formData.name, formData.username, formData.password);
      console.log("Registration successful");
      navigate("/");
    } catch (error) {
      setError(
        error.errors || [
          {
            msg: error.message || "Registration failed",
          },
        ],
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className={style.registerPage}>
      {error.length > 0 && (
        <div className={style.error}>
          <ul className={style.errorList}>
            {error.map((err, index) => (
              <li key={index}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={style.registerForm}>
        <div className={style.registerHeading}>
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={style.formLabel}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={style.formInput}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className={style.formLabel}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={style.formInput}
              value={formData.username}
              onChange={handleInputChange}
              required
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
              className={style.formInput}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            Already have an account?
            <Link to="/login" className={style.loginLink}>
              {" "}
              Login here.
            </Link>
          </div>
          <button
            type="submit"
            className={style.registerButton}
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>{" "}
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
