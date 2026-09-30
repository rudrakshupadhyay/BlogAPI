import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./pendingRequest.module.css";
import PendingRequestList from "../../components/pendingRequestList/pendingRequestList.jsx";
import { Link } from "react-router";
function PendingRequestPage() {
  const { user, loading } = useAuth();
  return (
    <div className={styles.pendingRequest}>
      {loading ? (
        <div className={styles.loadingMessage}>
          <p>Loading...</p>
        </div>
      ) : !user ? (
        <div className={styles.errorMessage}>
          <p>Please log in to view your pending requests.</p>
          <Link to="/login" className={styles.loginLink}>
            Go to Login
          </Link>
        </div>
      ) : user.role === "OWNER" ? (
        <PendingRequestList />
      ) : (
        <div className={styles.errorMessage}>
          Only owners can view pending requests.
        </div>
      )}
    </div>
  );
}

export default PendingRequestPage;
