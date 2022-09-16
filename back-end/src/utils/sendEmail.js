const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: "kromac.ui.framework@gmail.com",
    subject,
    text,
    html,
  };

  return sendgrid.send({ ...msg });
};
