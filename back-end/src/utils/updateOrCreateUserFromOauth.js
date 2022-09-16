import res from "express/lib/response";
import { getDbConnection } from "../db";
export const updateOrCreateUSerFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;
  const db = getDbConnection("react-auth-db");
  const existingUSer = await db.collection("users").findOne({
    email,
  });
  if (existingUSer) {
    const result = await db.collection("users").findOneAndUpdate(
      { email },
      {
        $set: { googleId, isVerified },
      },
      { returnOriginal: false }
    );
    return result.value;
  } else {
    const result = await db.collection("users").insertOne({
      email,
      googleId,
      isVerified,
      info: {},
    });

    return result.ops[0];
  }
};
