import { getDbConnection } from "../db";
import { ObjectID } from "mongodb";
import { JWTSign } from "../utils/jwt";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put",
  handler: async (req, res) => {
    const { email, verificationString } = req.body;
    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmRegistration(
      verificationString,
      true,
      async (err) => {
        if (err)
          return res
            .status(401)
            .json({ message: "The email verification is incorrect" });

        const db = getDbConnection("react-auth-db");
        const result = await db
          .collection("users")
          .findOneAndUpdate(
            { email },
            { $set: { isVerified: true } },
            { returnOriginal: false }
          );
        const { info, _id: id } = result.value;
        JWTSign(
          {
            id,
            email,
            isVerified: true,
            info,
          },
          res
        );
      }
    );
  },
};
