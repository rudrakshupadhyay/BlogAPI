import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "../../pages/pendingRequest/pendingRequest.module.css";
import getPendingRequest from "../../api/getPendingRequest.js";

function PendingRequestList() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
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

  return (
    <div>
      <h2>Pending Requests</h2>
      {isLoadingList ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>{request.reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PendingRequestList;
