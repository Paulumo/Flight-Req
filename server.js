const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
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

// Handle form submission
app.post('/submit-request', async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);
        
        const { name, email, date, time, wtgCode, turbineConfig } = formData;
        
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

        // Send email
        await transporter.sendMail(mailOptions);
        
        // Respond with a JSON object
        res.status(200).json({ message: 'Request received successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});