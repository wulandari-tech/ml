const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); // Import path
const app = express();
const port = 3000;


app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let requests = [];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'berlianawan498@gmail.com', // GANTI DENGAN EMAIL ANDA
        pass: 'olre djtq lzyu oaxg'          // GANTI DENGAN PASSWORD ANDA
    }
});


app.post('/submit_request', (req, res) => {
    requests.push(req.body);
    res.status(200).send('Request submitted!');
});

app.get('/admin/api/requests', (req, res) => {
    res.json(requests);
});

app.post('/admin/api/send_reply', (req, res) => {
    const { to, subject, body } = req.body;
    const mailOptions = {
        from: 'wanzofc.tech@gmail.com',  // GANTI DENGAN EMAIL ANDA
        to, subject, text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully!');
        }
    });
});

// Sajikan file statis dari React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Tangkap semua route lain dan sajikan index.html dari React app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});