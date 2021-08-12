// Googleapis
const { google } = require("googleapis");
const nodemailer = require('nodemailer')
// Pull out OAuth2 from googleapis
const OAUTH_CLIENT_ID = "598838860383-o2u2qkekb9am6q6l2tkfvqov14qu785a.apps.googleusercontent.com"
const OAUTH_CLIENT_SECRET = "mq_wsBrdZ6dgoRjwY7thaBRp"
const OAUTH_REFRESH_TOKEN = "1//04nIZOhlNXbXOCgYIARAAGAQSNwF-L9Ir4JsBUpUV1Z9DCFXRbg7kKi7tQRD79OObd39fASabvtD-K_daAyLRbx-YzalUkhlOWEM"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"

async function sendemail(mailOptions) {
    try {

        //1
        const oauth2Client = new google.auth.OAuth2(
            OAUTH_CLIENT_ID,
            OAUTH_CLIENT_SECRET,
            REDIRECT_URI
        );
        //2
        oauth2Client.setCredentials({
            refresh_token: OAUTH_REFRESH_TOKEN,
        });
        //3
        const accessToken = await oauth2Client.getAccessToken()
        //4
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "rathodparmeshwar4321@gmail.com",
                accessToken: accessToken,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN
            }
        });
        const result = await transport.sendMail(mailOptions)
        return result
    }

    catch (er) {
        return er;
    }

}
const mailOptions = {
    from: "rathodparmeshwar4321@gmail.com",
    to: "khaja21@navgurukul.org",
    subject: "testing",
    text: "good evening brother "
};

// sendemail(mailOptions)
//     .then((result) => {
//         console.log("EMAIL SENT...", result);
//     })
//     .catch((er)=>
//         console.log(er)
//     )

module.exports=sendemail;