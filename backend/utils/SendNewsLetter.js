const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = async (to, userName = "Subscriber") => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL
      secure: true, // must be true for port 465
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // Gmail App Password if 2FA is enabled
      },
      logger: true,
      debug: true,
      connectionTimeout: 10000, // optional: fail faster
      family: 4, // force IPv4
    });

    // 🎨 Beautiful HTML Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            color: #4f46e5;
          }
          .btn {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            background-color: #4f46e5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="header">🎉 Welcome to Our Newsletter</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for subscribing to our newsletter! 🚀</p>
          <p>You will now receive the latest updates, news, and exclusive content directly in your inbox.</p>
          
          <center>
            <a href="#" class="btn">Visit Our Website</a>
          </center>

          <div class="footer">
            <p>If you didn’t subscribe, you can ignore this email.</p>
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Welcome to Our Newsletter!",
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
