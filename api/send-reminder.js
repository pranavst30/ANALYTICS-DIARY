require("dotenv").config(); // Load environment variables

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
  subject: "🌟 Missed today’s entry? Let’s turn this around!",
  html: `
    <p>Hey there! 👋</p>

    <p>You haven’t logged your day yet — and that’s your chance to take control 💪</p>

    <p>This is your nudge from the future YOU — the one who's consistent, focused, and crushing goals. One entry. A few minutes. That’s all it takes to spark momentum today.</p>

    <p>👉 <a href="https://diary-analy.vercel.app/" target="_blank" style="color:#1a73e8; font-weight:bold;">Log Today’s Entry</a></p>

    <h3>Why should you log today?</h3>
    <ul>
      <li>Keep your streak alive (or start one 🔥)</li>
      <li>Capture your mindset and energy</li>
      <li>See real growth over time — one day at a time</li>
    </ul>

    <p><strong>You’ve got what it takes. Let’s go build the life you’re aiming for 🚀</strong></p>

    <p>— Your Analytics Diary Team</p>
  `,
});

async function sendEmailsToAllUsers() {
  console.log("🚀 Checking for users without entries today...");

  try {
    const now = moment().tz("Asia/Kolkata");
    const startOfDay = now.clone().startOf("day").toDate();
    const endOfDay = now.clone().endOf("day").toDate();

    const users = await prisma.user.findMany();

    for (const user of users) {
      const entry = await prisma.entry.findFirst({
        where: {
          userId: user.id,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      if (!entry) {
        const mailOptions = createMailOptions(user.email);
        await transporter.sendMail(mailOptions);
        console.log(`📩 Reminder sent to ${user.email}`);
      } else {
        console.log(`✅ ${user.email} has already written today.`);
      }
    }

    console.log("🎉 Email check complete.");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
}

sendEmailsToAllUsers();
