import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../configs/keys";
import { generateTokenClaims } from "../utils";



export const signUp = async (req, res) => {
  try {
    //the order of these must match the order they come from in the front
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(422)
        .json({ error: "Please enter all the fields." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User with that email already exists." });
    }

    if (password !== confirmPassword) {
      return res
        .status(422)
        .json({ error: "Passwords do not match." });
    }

    const passwordHash = bcrypt.hashSync(password, 12);

    const newUser = await User.create({ name, email, passwordHash });

    const claims = generateTokenClaims(newUser);

    const token = jwt.sign(claims, keys.jwt.secret);

    res.cookie("blogUser", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token, user: { uid: newUser._id, email, name } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "All fields required." });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(422)
        .json({ error: "Invalid email/password." });
    }

    const passwordsMatch = bcrypt.compareSync(
      password,
      existingUser.passwordHash
    );

    if (!passwordsMatch) {
      return res
        .status(422)
        .json({ error: "Invalid email/password." });
    }

    const claims = generateTokenClaims(existingUser);

    const token = jwt.sign(claims, keys.jwt.secret);

    res.cookie("blogUser", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: { uid: existingUser._id, name: existingUser.name, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};
