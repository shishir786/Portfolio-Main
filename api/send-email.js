import postmark from "postmark";

// Access API key from environment variables
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailContent = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;

  const data = {
    From: email,
    To: "abdullahshishir786@gmail.com", // Your email address
    Subject: "New Contact Form portfolio",
    HtmlBody: emailContent,
  };

  try {
    await client.sendEmail(data);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
