const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pranavtavarej@gmail.com",
    pass: "achqpvryuhyncpfi", // Gmail App Password
  },
});

const createMailOptions = (toEmail) => ({
  from: "Analytics Diary <pranavtavarej@gmail.com>",
  to: toEmail,
  subject: "📔 Your Analytics Diary is ready for today's entry!",
  text: `Good morning!

It's a fresh start — the perfect time to reflect, plan, and track your progress. Your Analytics Diary is ready for today's entry.

Start writing now 👉 https://diary-analy.vercel.app/

Why log your day?
• Stay consistent with your habits
• Track your productivity & mindset
• Build self-awareness over time

Just a few minutes each day can make a big difference. 💪

Let’s make today meaningful — you’ve got this!

Cheers,
The Analytics Diary Team
`,
  html: `
    <p>Good morning!</p>
    <p>It’s a fresh start — the perfect time to reflect, plan, and track your progress. Your Analytics Diary is ready for today’s entry.</p>

    <p>🖊️ <strong>Start writing now:</strong><br>
    👉 <a href="https://diary-analy.vercel.app/" target="_blank" style="color:#1a73e8; font-weight:bold;">Log Today’s Entry</a></p>

    <h3>Why log your day?</h3>
    <ul>
      <li>Stay consistent with your habits</li>
      <li>Track your productivity & mindset</li>
      <li>Build self-awareness over time</li>
    </ul>

    <p>Just a few minutes each day can make a big difference. 💪</p>

    <p>Let’s make today meaningful — you’ve got this!</p>

    <p>Cheers,<br>
    The Analytics Diary Team</p>
  `,
});

async function sendEmailsToAllUsers() {
  console.log("🚀 Sending daily reminder emails...");

  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      console.log("⚠️ No users found.");
      return;
    }

    for (const user of users) {
      const mailOptions = createMailOptions(user.email);
      await transporter.sendMail(mailOptions);
      console.log(`📩 Sent to ${user.email}`);
    }

    console.log("✅ All reminder emails sent successfully.");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
}

// 🔔 Schedule: 4:36 PM IST = 11:06 AM UTC
cron.schedule("6 11 * * *", () => {
  console.log("⏰ Triggered at 4:36 PM IST");
  sendEmailsToAllUsers();
});

// 🟢 Keep the app running
console.log("📆 Cron job scheduled for 4:36 PM IST daily.");
