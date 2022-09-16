import { JWTSign } from "../utils/jwt";
import { getDbConnection } from "../db";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          const db = getDbConnection("react-auth-db");
          const user = await db.collection("users").findOne({ email });
          const { _id: id, isVerified, info } = user;
          JWTSign(
            {
              id,
              isVerified,
              email,
              info,
            },
            res
          );
        },
        onFailure: (err) => {
          res.sendStatus(401);
        },
      }
    );
  },
};
