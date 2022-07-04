const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "130229614353-04i4pai1rlmdrjk9cmeo9cm96gvkde41.apps.googleusercontent.com";
const CLIENT_SECRET_KEY = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//046vhvIaoXALuCgYIARAAGAQSNwF-L9IrhfDDMRoAHoEz9yySxjM1QpyEjqIQngVT0aKoKkLofQu3LmOFY94FETH1WdMJZ2s-g8I";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET_KEY,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (email, password) => {
  try {
    const accessToken = oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "batch16.076@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET_KEY,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "Faizan Rizwan <batch16.076@gmail.com>",
      to: email,
      subject: "Yours newly generated password",
      text: `Here is your password: ${password}. Save this for further use`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = sendMail;
