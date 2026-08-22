import style from "./Register.module.css";
import { Link } from "react-router";
import { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState([]);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        console.log("Registration failed");
        setError(data.errors || ["Registration failed"]);
        return;
      }

      console.log("Registration successful");
    } catch (error) {
      setError([
        "An error occurred during registration. Please try again later.",
      ]);
      console.error("Error:", error);
    }
  }
  return (
    <div className={style.registerPage}>
      {error && (
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
            />
          </div>
          <div>
            Already have an account?
            <Link to="/login" className={style.loginLink}>
              {" "}
              Login here.
            </Link>
          </div>
          <button type="submit" className={style.registerButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
