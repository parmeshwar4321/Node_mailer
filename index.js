const express = require('express')
const app = express()

const path=require('path')
require('dotenv').config()
const PORT = process.env.port || 3000
const sendemail = require('./googleAuth')

// Middlewears
const upload = require('./middlewear/multer')
//static files
app.use(express.static('public'))


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.render('index')
    });

console.log();
app.post("/success.html", upload.single('attachment'), (req, res) => {
    try {
    
        const recipient = req.body.To_email;
        const subject = req.body.subject;
        const message = req.body.message;
        const attachmentPath = req.file

        let mailOptions = {
            from: process.env.myEmail,
            to: recipient,
            subject: subject,
            text: message,
            attachments:attachmentPath
        }

        sendemail(mailOptions)
            .then((result) => {
                console.log("EMAIL SENT...", result);
            })
            .catch((er) =>
                console.log(er)
            )

    }
    catch (er) {send_email
        console.log(er);
    }
});


app.listen(PORT, () => { console.log(`YOUR SERVER IS RUNNING AT PORT:: ${PORT}`); })
