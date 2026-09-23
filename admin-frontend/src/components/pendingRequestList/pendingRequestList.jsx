import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./pendingRequestList.module.css";
import getPendingRequest from "../../api/getPendingRequest.js";
import Header from "../header/header.jsx";
import updateAdminRequest from "../../api/updateAdminRequest.js";

function PendingRequestList() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [currentUpdatingRequestId, setCurrentUpdatingRequestId] =
    useState(null);
  const { accessToken, refreshAccessToken } = useAuth();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setIsLoadingList(true);
      setError(null);
      try {
        let response = await getPendingRequest(accessToken);

        if (response.status === 401) {
          try {
            await refreshAccessToken();
          } catch (refreshError) {
            console.error("Session expired:", refreshError);
            setError(refreshError.message);
          }
          return;
        }
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch pending requests");
        }

        setPendingRequests(data.requests);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        setError(error.message);
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchPendingRequests();
  }, [accessToken, refreshAccessToken]);

  const handleStatusChange = async (requestId, status) => {
    setError(null);
    setCurrentUpdatingRequestId(requestId); // Set the currently updating request ID
    try {
      let response = await updateAdminRequest(accessToken, requestId, status);

      if (response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          response = await updateAdminRequest(
            newAccessToken,
            requestId,
            status,
          );
        } catch (refreshError) {
          console.error("Session expired:", refreshError);
          setError(refreshError.message);
          return;
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to update request",
        );
      }

      // Remove the processed request from the pending list
      setPendingRequests((requests) =>
        requests.filter((request) => request.id !== requestId),
      );
    } catch (error) {
      console.error("Error updating admin request:", error);
      setError(error.message);
    } finally {
      setCurrentUpdatingRequestId(null); // Reset the currently updating request ID
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.pendingRequestsTitle}>Pending Requests</h2>
        {isLoadingList ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className={styles.pendingRequestsTable}>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Username</th>
                <th>Name</th>
                <th>Reason</th>
                <th>Genre</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.user.username}</td>
                  <td>{request.user.name}</td>
                  <td>{request.reason}</td>
                  <td>{request.genre || "—"}</td>

                  <td className={styles.actionCell}>
                    <button
                      type="button"
                      className={styles.approveButton}
                      onClick={() => handleStatusChange(request.id, "APPROVED")}
                      disabled={currentUpdatingRequestId === request.id}
                    >
                      {currentUpdatingRequestId === request.id
                        ? "Updating..."
                        : "Approve"}
                    </button>

                    <button
                      type="button"
                      className={styles.rejectButton}
                      onClick={() => handleStatusChange(request.id, "REJECTED")}
                      disabled={currentUpdatingRequestId === request.id}
                    >
                      {currentUpdatingRequestId === request.id
                        ? "Updating..."
                        : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PendingRequestList;
