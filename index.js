const express = require('express')
const app = express()


require('dotenv').config()
const PORT = process.env.port || 3000
const sendemail = require('./middlewear/googleAuth')
// Multer file storage
const upload = require('./middlewear/multer')
app.use(express.static('public'))
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/send_email", (req, res) => {
    res.sendFile("/index.html");
});

app.post("/send_email", upload.single('attachment'), (req, res) => {
    try {
        const recipient = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;
        const attachmentPath = req.file.path;

        let mailOptions = {
            from: process.env.myEmail,
            to: recipient,
            subject: subject,
            text: message,
        };

        sendemail(mailOptions)
            .then((result) => {
                console.log("EMAIL SENT...", result);
            })
            .catch((er) =>
                console.log(er)
            )


    }
    catch (er) {
        console.log(er);
    }
});


app.listen(PORT, () => { console.log(`YOUR SERVER IS RUNNING AT PORT:: ${PORT}`); })



















// { "web": { "client_id": "598838860383-o2u2qkekb9am6q6l2tkfvqov14qu785a.apps.googleusercontent.com", "project_id": "projectemailsender", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "mq_wsBrdZ6dgoRjwY7thaBRp", "redirect_uris": ["https://developers.google.com/oauthplayground/"] } }