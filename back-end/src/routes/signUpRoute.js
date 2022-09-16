import { getDbConnection } from "../db";
import { JWTSign } from "../utils/jwt";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";
// import bcrypt from "bcrypt";
// import { v4 as uudi } from "uuid";
// import { sendEmail } from "../utils/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];
    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Unable to sign up user" });
        }
        const db = getDbConnection("react-auth-db");
        const startingInfoUser = {
          hairColor: "",
          favoriteFood: "",
          bio: "",
        };
        const result = await db.collection("users").insertOne({
          email,
          info: startingInfoUser,
        });
        const { insertedId } = result;
        JWTSign(
          {
            id: insertedId,
            isVerified: false,
            info: startingInfoUser,
            email,
          },
          res
        );
      }
    );
  },
};

/**
 const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) res.sendStatus(401);

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationString = uudi();
    const startingInfoUser = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfoUser,
      isVerified: false,
      verificationString,
    });

    const { insertedId } = result;

    try {
      await sendEmail({
        to: email,
        subject: "Please verify your email",
        text: `
          thanks for signing up! To verify your email, click here:
          http://localhost:3000/verify-email/${verificationString}
        `,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

    JWTSign(
      {
        id: insertedId,
        email,
        info: startingInfoUser,
        isVerified: false,
      },
      res
    );
 */
