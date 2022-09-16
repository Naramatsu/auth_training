import jwt from "jsonwebtoken";
import { getGoogleUser } from "../utils/getGoogleUser";
import { updateOrCreateUSerFromOauth } from "../utils/updateOrCreateUserFromOauth";

export const googleOauthCallbackRoute = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;
    const oauthUserInfo = await getGoogleUser({ code });
    const updatedUser = await updateOrCreateUSerFromOauth({ oauthUserInfo });
    const { _id: id, isVerified, email, info } = updatedUser;
    jwt.sign(
      {
        id,
        isVerified,
        email,
        info,
      },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.redirect(`http://localhost:3000/login?token=${token}`);
      }
    );
  },
};
