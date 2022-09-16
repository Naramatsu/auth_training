import { JWTSign } from "../utils/jwt";
import { getDbConnection } from "../db";
import { ObjectID } from "mongodb";
import jwt from "jsonwebtoken";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization)
      return res.status(401).json({ message: "Auth is required" });

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Enable to verify the token" });

      const { id, isVerified } = decoded;

      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });

      if (!isVerified)
        return res
          .status(403)
          .json({ message: "You need to verify tour email before updating" });

      const db = getDbConnection("react-auth-db");
      const result = await db.collection("users").findOneAndUpdate(
        { _id: ObjectID(id) },
        {
          $set: { info: updates },
        },
        { returnOriginal: false }
      );

      const { email, info } = result.value;

      JWTSign(
        {
          id,
          email,
          isVerified,
          info,
        },
        res
      );
    });
  },
};
