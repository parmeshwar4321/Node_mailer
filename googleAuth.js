// Googleapis
const { google } = require("googleapis");
const nodemailer = require('nodemailer')
async function sendemail(mailOptions) {
    try {
        //1
        const oauth2Client = new google.auth.OAuth2(
            process.env.OAUTH_CLIENT_ID,
            process.env.OAUTH_CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
        //2
        oauth2Client.setCredentials({
            refresh_token: process.env.OAUTH_REFRESH_TOKEN,
        });
        //3
        const accessToken = await oauth2Client.getAccessToken()
        //4
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.myEmail,
                accessToken: accessToken,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });
        const result = await transport.sendMail(mailOptions)
        return result
    }

    catch (er) {
        return er;
    }

}
// const mailOptions = {
//     from: "rathodparmeshwar4321@gmail.com",
//     to: "khaja21@navgurukul.org",
//     subject: "testing",
//     text: "good evening brother "
// };

// sendemail(mailOptions)
//     .then((result) => {
//         console.log("EMAIL SENT...", result);
//     })
//     .catch((er)=>
//         console.log(er)
//     )

module.exports = sendemail;