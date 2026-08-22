import style from "./Register.module.css";
import { Link } from "react-router";
function RegisterPage() {
  return (
    <div className={style.registerPage}>
      <div className={style.registerForm}>
        <div className={style.registerHeading}>
          <h1>Register</h1>
        </div>
        <form>
          <div>
            <label htmlFor="name" className={style.formLabel}>
              Name:
            </label>
            <input type="text" id="name" className={style.formInput} />
          </div>
          <div>
            <label htmlFor="username" className={style.formLabel}>
              Username:
            </label>
            <input type="text" id="username" className={style.formInput} />
          </div>
          <div>
            <label htmlFor="pass" className={style.formLabel}>
              Password:
            </label>
            <input type="password" id="pass" className={style.formInput} />
          </div>
          <div>
            Already have an account?
            <Link to="/login" className={style.loginLink}>
              {" "}
              Login here.
            </Link>
          </div>
          <button className={style.registerButton}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
