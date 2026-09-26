import Header from "../../components/header/header.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import getMinePostStatisticsApi from "../../api/getMinePostStatisticsApi.js";
import styles from "./dashboard.module.css";
import getFeaturedPostApi from "../../api/getFeaturedPostApi.js";

function Dashboard() {
  const { accessToken, refreshAccessToken, user } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingFeaturedPosts, setLoadingFeaturedPosts] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoadingStats(true);
      setError(null);
      try {
        let response = await getMinePostStatisticsApi(accessToken);
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          response = await getMinePostStatisticsApi(newAccessToken);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user's post statistics");
        }

        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user's post statistics:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStatistics();
  }, [accessToken, refreshAccessToken]);


  return (
    <div>
      <Header />
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <h1 className={styles.dashboardTitle}>My Dashboard</h1>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.statisticsContainer}>
            <h2 className={styles.welcomeMessage}>Welcome, {user?.name}!</h2>
            {loadingStats ? (
              <p className={styles.loadingMessage}>Loading statistics...</p>
            ) : (
              <div className={styles.statistics}>
                <p>Posts: {statistics?.total || 0}</p>
                <p>Published: {statistics?.published || 0}</p>
                <p>Unpublished: {statistics?.unpublished || 0}</p>
              </div>
            )}
            <h2 className={styles.welcomeMessage}>Featured Posts</h2>
            <div className={styles.recentActivityContainer}>
              <p>No featured posts available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
