document.querySelectorAll('.radial-bars').forEach((bar) => {
    let percentage = bar.querySelector('.percentage').innerText;
    let circle = bar.querySelector('.progress-bar');
    let radius = circle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (circumference * parseInt(percentage)) / 100;
});
window.addEventListener('load', () => {
    document.querySelectorAll('.progress-line span').forEach(bar => {
        bar.style.width = bar.dataset.progress;
    });
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'Abcdefg'
        }
    });

    const mailOptions = {
        from: email,
        to: 'youremail@gmail.com',
        subject: 'This is the subject',
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
