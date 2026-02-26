const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Enable debug output for Nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Transporter verification failed:", error);
  } else {
    console.log("✅ Transporter is ready to send emails:", success);
  }
});

const sendVerificationEmail = async (to, name, verifyUrl) => {
  console.log(`📧 Preparing verification email for: ${to}`);

  const mailOptions = {
    from: `"EcoTracker" <${EMAIL_USER}>`,
    to,
    subject: "🌿 Verify Your EcoTracker Account",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#f4f7f6; font-family:Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        
        <!-- Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:12px; padding:40px; 
          box-shadow:0 8px 20px rgba(0,0,0,0.05);">
          
          <!-- Logo / Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; color:#1b5e20; font-size:28px;">
                🌿 EcoTracker
              </h1>
              <p style="margin:5px 0 0; color:#777;">
                Track. Improve. Sustain.
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td>
              <h2 style="color:#333;">Hello ${name},</h2>
              <p style="color:#555; line-height:1.6;">
                Thank you for joining <strong>EcoTracker</strong> 🌍.
                Please verify your account to start tracking your environmental impact
                and make the world greener.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <a href="${verifyUrl}" 
                style="
                  background:#2ecc71;
                  color:#ffffff;
                  padding:14px 28px;
                  font-size:16px;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                  display:inline-block;
                ">
                ✅ Verify My Account
              </a>
            </td>
          </tr>

          <!-- Expiry Note -->
          <tr>
            <td>
              <p style="color:#888; font-size:14px;">
                ⏳ This verification link will expire in 24 hours.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:20px 0;">
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center">
              <p style="color:#aaa; font-size:12px;">
                If you didn’t create this account, you can safely ignore this email.
              </p>
              <p style="color:#aaa; font-size:12px;">
                © ${new Date().getFullYear()} EcoTracker. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err);
    throw err;
  }
};

module.exports = { sendVerificationEmail };
