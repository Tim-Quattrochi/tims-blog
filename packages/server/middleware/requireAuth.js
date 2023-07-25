import jwt from "jsonwebtoken";
import { User } from "../models";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function requireAuth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.sub).select(
        "-passwordHash"
      );

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ error: "Not authorized." });
  }
}
