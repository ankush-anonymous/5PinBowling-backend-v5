const nodemailer = require("nodemailer");

const contactUs = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsToAdmin = {
    from: email,
    to: process.env.EMAIL,
    subject: `Contact Form Submission: ${subject}`,
    html: `<p>You have a new contact form submission:</p>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${email}</li>
             <li><strong>Phone:</strong> ${phone}</li>
           </ul>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  };

  const mailOptionsToUser = {
    from: process.env.EMAIL,
    to: email,
    subject: "Thank you for contacting us!",
    html: `<p>Hi ${name},</p>
           <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
           <p>Best regards,</p>
           <p>The 5-Pin Bowling Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails" });
  }
};

module.exports = { contactUs };
