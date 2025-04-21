const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
const moment = require("moment-timezone");

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createMailOptions = (toEmail) => ({
  from: `Analytics Diary <${process.env.EMAIL_USER}>`,
  to: toEmail,
  subject: "📔 Your Analytics Diary is ready for today's entry!",
  text: "Hey there! Don't forget to log your productivity today. 📝",
  html: `
    <div style="font-family:sans-serif;">
      <h2>📔 Your Analytics Diary Reminder</h2>
      <p>Hi there,</p>
      <p>This is your daily nudge to write your productivity journal. Just 2 mins!</p>
      <p><a href="https://yourappurl.com/main/journal/write" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">Write Now</a></p>
      <p style="font-size:12px;color:#555;">— Team Analytics Diary</p>
    </div>
  `,
});

async function sendEmailsToAllUsers() {
  const now = moment().tz("Asia/Kolkata");
  const hour = now.hour();
  const minute = now.minute();

  const isInWindow =
    (hour > 18 && hour < 21) ||
    (hour === 18 && minute >= 0) ||
    (hour === 21 && minute <= 1);

  if (!isInWindow) {
    console.log("⏳ Not in time window (6:00 PM – 9:01 PM IST). Skipping email send.");
    return;
  }

  try {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
      console.log("⚠ No users found in the database.");
      return;
    }

    for (const user of users) {
      const mailOptions = createMailOptions(user.email);
      await transporter.sendMail(mailOptions);
      console.log(`📩 Email sent to ${user.email}`);
    }

    console.log("✅ All emails sent.");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  } finally {
    await prisma.$disconnect();
  }
}

sendEmailsToAllUsers();
