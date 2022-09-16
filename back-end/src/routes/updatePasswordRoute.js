import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const updatePasswordRoute = {
  path: "/api/udate-password",
  method: "put",
  handler: async (req, res) => {
    const { email, newPassword, passwordResetCode } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmPassword(
      passwordResetCode,
      newPassword,
      {
        onSuccess: () => {
          res.sendStatus(200);
        },
        onFailure: () => {
          res.sendStatus(401);
        },
      }
    );
  },
};
