const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
require("dotenv").config(); // load variables from .env

// Load Gmail credentials from .env
const gmailEmail = process.env.EMAIL_USER;
const gmailPassword = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Callable function
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;

  const mailOptions = {
    from: email,
    to: gmailEmail,
    subject: `New Contact Form Message from ${name}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
});
