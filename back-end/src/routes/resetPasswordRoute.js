import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const resetPasswordRoute = {
  path: "/api/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        res.sendStatus(200);
      },
      onFailure: () => {
        res.sendStatus(500);
      },
    });
  },
};
