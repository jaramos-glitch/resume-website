require("dotenv").config();

// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST route for contact form
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

// Configure Gmail SMTP
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

  // Email content
  let mailOptions = {
    from: email,
    to: "joeyannramos0@gmail.com",
    subject: `New message from ${name}`,
    text: `Sender: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message.");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
