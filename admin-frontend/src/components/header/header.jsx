import { NavLink, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./header.module.css";
function Header() {
  const { user, logout } = useAuth();

  function handleLogout() {
    try {
      logout();
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.siteTitle}>Writely</h1>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navLink
                }
              >
                Posts
              </NavLink>
            </li>
            {user ? (
              <li>
                <button onClick={handleLogout} className={styles.logout}>
                  Logout
                </button>
              </li>
            ) : (
              <Link to="/login" className={styles.loginLink}>
                Login
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
