const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/src', express.static('src'));

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls : {
        ciphers:'SSLv3'
    }
});

app.post('/submit-request', async (req, res) => {
    // log the received request
    console.log("Received Data:", req.body)


    const { name, email, date, time, wtgCode, turbineConfig } = req.body;
    
    // Compose email
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to : process.env.EMAIL_RECEIVE,
        // to: process.env.EMAIL_RECEIVE , // Replace with your team's email
        subject: `New Flight Request From: ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Date: ${date}
            Time: ${time}
            WTG Code: ${wtgCode}
            Turbine Config: ${turbineConfig === 'Operational' ? 'Operational' : 'Lost Contact'}
        `
    };

    try {   
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Request submitted successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});