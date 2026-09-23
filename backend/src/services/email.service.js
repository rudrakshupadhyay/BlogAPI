import { Resend } from "resend";
import config from "../config/config.js";

const resend = new Resend(config.RESEND_API_KEY);

export const sendAdminRequestEmail = async ({
  username,
  name,
  genre,
  reason,
  requestId,
  reviewUrl,
}) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: config.OWNER_EMAIL,
    subject: `New Admin Request from @${username}`,
    html: `
      <h2>New Admin Request</h2>

      <p>Someone has requested admin access to your blog.</p>

      <h3>Applicant</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Username:</strong> @${username}</p>
      <p><strong>Genre:</strong> ${genre || "Not specified"}</p>

      <h3>Reason</h3>
      <p>${reason}</p>

      <p><strong>Request ID:</strong> ${requestId}</p>

      <a href="${reviewUrl}">Review Request</a>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return;
  }

  console.log("Email sent:", data);
};