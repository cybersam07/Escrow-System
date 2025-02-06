require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000; // Render assigns a PORT

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (frontend)
app.use(express.static("views"));

// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your App Password
    },
});

// API Route to Handle Transactions
app.post("/send-email", async (req, res) => {
    const { senderName, amount, currency } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL, // Email to receive transaction details
        subject: "New Escrow Transaction",
        text: `Sender: ${senderName}\nAmount: ${amount} ${currency}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Transaction email sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error sending email", details: error.message });
    }
});

// Serve Homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
