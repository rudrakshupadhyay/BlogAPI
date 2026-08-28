import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./pendingRequest.module.css";
import PendingRequestList from "../../components/pendingRequestList/pendingRequestList.jsx";
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
        </div>
      ) : user.role === "OWNER" ? (
        <PendingRequestList />
      ) : (
        <div>Only owners can view pending requests.</div>
      )}
    </div>
  );
}

export default PendingRequestPage;
