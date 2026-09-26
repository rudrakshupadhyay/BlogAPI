import { useAuth } from "./context/AuthContext.jsx";
import { Outlet, Link } from "react-router";
import AdminRequestPage from "./components/adminRequest/adminRequest.jsx";
import styles from "./App.module.css";

function App() {
  const { user, loading } = useAuth();
  return (
    <div className={styles.app}>
      <main>
        {loading ? (
          <p className={styles.loading}>Loading Auth...</p>
        ) : user ? (
          user.role === "READER" ? (
            <AdminRequestPage />
          ) : (
            <Outlet />
          )
        ) : (
          <div className={styles.loginPrompt}>
            <p className={styles.loginPromptText}>Please log in to access the admin panel.</p>
            <Link to="/login" className={styles.loginLink}>Go to Login</Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
