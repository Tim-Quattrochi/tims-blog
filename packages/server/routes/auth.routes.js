import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/auth", (req, res) => {
  res.send(200).json("auth endpoint");
});

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export default authRouter;
