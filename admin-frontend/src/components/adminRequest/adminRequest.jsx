import styles from "./adminRequest.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import createAdminRequests from "../../api/createAdminRequest.js";

function AdminRequestPage() {
  const [formData, setFormData] = useState({
    reason: "",
    genre: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken, refreshAccessToken } = useAuth();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      let response = await createAdminRequests(
        formData.reason,
        formData.genre || null,
        accessToken,
      );

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        response = await createAdminRequests(
          formData.reason,
          formData.genre || null,
          newAccessToken,
        );
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send admin request");
      }

      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.adminRequest}>
      {submissionSuccess && (
        <div className={styles.successMessage}>
          <p>Your admin request has been submitted successfully!</p>
        </div>
      )}
      {error && (
        <div className={styles.adminRequestError}>
          <p>{error}</p>
        </div>
      )}
      <div className={styles.adminRequestCard}>
        <div className={styles.adminRequestHeading}>
          <h1>Admin Request Page</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.formLabel}>
              Reason for Admin Request:
            </label>
            <textarea
              id="reason"
              name="reason"
              className={styles.formTextarea}
              required
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genre" className={styles.formLabel}>
              Genre you want to write about (optional):
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              className={styles.formTextarea}
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className={styles.formButton}
            disabled={isSubmitting || submissionSuccess}
          >
            Send Request
          </button>
        </form>
        <div className={styles.adminRequestInfo}>
          <p>Please fill out the form above to submit an admin request.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminRequestPage;
