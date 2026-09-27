import { Resend } from "resend";
import config from "../config/config.js";
import escapeHtml from "../utils/escapeHtml.js";

const resend = new Resend(config.RESEND_API_KEY);

export const sendAdminRequestEmail = async ({
  username,
  name,
  genre,
  reason,
  requestId,
  reviewUrl,
}) => {
  const sanitizedUsername = escapeHtml(username);
  const sanitizedName = escapeHtml(name);
  const sanitizedGenre = genre ? escapeHtml(genre) : "Not specified";
  const sanitizedReason = escapeHtml(reason);
  const sanitizedRequestId = escapeHtml(requestId);
  const sanitizedReviewUrl = escapeHtml(reviewUrl);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: config.OWNER_EMAIL,
    subject: `New Admin Request from @${sanitizedUsername}`,
    html: `
      <h2>New Admin Request</h2>

      <p>Someone has requested admin access to your blog.</p>

      <h3>Applicant</h3>
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Username:</strong> @${sanitizedUsername}</p>
      <p><strong>Genre:</strong> ${sanitizedGenre}</p>

      <h3>Reason</h3>
      <p>${sanitizedReason}</p>

      <p><strong>Request ID:</strong> ${sanitizedRequestId}</p>

      <a href="${sanitizedReviewUrl}">Review Request</a>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return;
  }

  console.log("Email sent:", data);
};
