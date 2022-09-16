import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "jonxthxn1911@gmail.com",
        from: "kromac.ui.framework@gmail.com",
        subject: "Testing Its work",
        text: "Good we",
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(JSON.stringify(error));
      res.sendStatus(500);
    }
  },
};
