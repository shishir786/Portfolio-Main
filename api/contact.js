import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Configure Nodemailer with your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: "abdullahshishir786@gmail.com",
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
