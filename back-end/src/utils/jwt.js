import jwt from "jsonwebtoken";

export const JWTSign = (params, res) => {
  jwt.sign(
    { ...params },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    },
    (err, token) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ token });
    }
  );
};
